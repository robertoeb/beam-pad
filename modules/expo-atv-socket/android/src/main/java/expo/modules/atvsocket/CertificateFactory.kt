package expo.modules.atvsocket

import org.bouncycastle.asn1.x500.X500Name
import org.bouncycastle.cert.jcajce.JcaX509CertificateConverter
import org.bouncycastle.cert.jcajce.JcaX509v3CertificateBuilder
import org.bouncycastle.jce.provider.BouncyCastleProvider
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder
import java.io.ByteArrayInputStream
import java.math.BigInteger
import java.security.*
import java.security.cert.CertificateFactory as X509CF
import java.security.cert.X509Certificate
import java.security.interfaces.RSAPublicKey
import java.security.spec.PKCS8EncodedKeySpec
import java.util.*

object CertificateFactory {
  init {
    Security.removeProvider(BouncyCastleProvider.PROVIDER_NAME)
    Security.addProvider(BouncyCastleProvider())
  }

  data class ClientCert(val cert: X509Certificate, val key: PrivateKey)

  fun generate(): ClientCert {
    val kpg = KeyPairGenerator.getInstance("RSA").apply { initialize(2048) }
    val kp = kpg.generateKeyPair()
    val dn = X500Name("CN=androidtv-remote")
    val now = System.currentTimeMillis()
    val builder = JcaX509v3CertificateBuilder(
      dn, BigInteger.valueOf(now), Date(now - 86_400_000L), Date(now + 3650L * 86_400_000L), dn, kp.public
    )
    val holder = builder.build(JcaContentSignerBuilder("SHA256withRSA").build(kp.private))
    val cert = JcaX509CertificateConverter().getCertificate(holder)
    return ClientCert(cert, kp.private)
  }

  /** DER -> unsigned big-endian bytes, leading 0x00 stripped (protocol needs raw modulus). */
  fun rsaComponents(pub: PublicKey): Pair<ByteArray, ByteArray> {
    val rsa = pub as RSAPublicKey
    return strip(rsa.modulus.toByteArray()) to strip(rsa.publicExponent.toByteArray())
  }

  private fun strip(b: ByteArray) = b.dropWhile { it == 0.toByte() }.toByteArray()

  fun toPem(type: String, der: ByteArray) =
    "-----BEGIN $type-----\n" +
      Base64.getMimeEncoder(64, "\n".toByteArray()).encodeToString(der) +
      "\n-----END $type-----\n"

  fun certFromPem(pem: String): X509Certificate {
    val der = pemToDer(pem)
    return X509CF.getInstance("X.509").generateCertificate(ByteArrayInputStream(der)) as X509Certificate
  }

  fun keyFromPem(pem: String): PrivateKey =
    KeyFactory.getInstance("RSA").generatePrivate(PKCS8EncodedKeySpec(pemToDer(pem)))

  private fun pemToDer(pem: String) = Base64.getDecoder().decode(
    pem.lines().filter { !it.startsWith("-----") && it.isNotBlank() }.joinToString("")
  )
}
