package expo.modules.atvsocket

import android.util.Base64
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.concurrent.ConcurrentHashMap

class AtvSocketModule : Module() {
  private val sessions = ConcurrentHashMap<String, TlsSession>()
  private var mic: MicStreamer? = null

  override fun definition() = ModuleDefinition {
    Name("AtvSocket")
    Events("onSocketData", "onSocketState", "onMicData")

    AsyncFunction("generateClientCertificate") {
      val c = CertificateFactory.generate()
      val (mod, exp) = CertificateFactory.rsaComponents(c.cert.publicKey)
      mapOf(
        "pem" to CertificateFactory.toPem("CERTIFICATE", c.cert.encoded),
        "privateKeyPem" to CertificateFactory.toPem("PRIVATE KEY", c.key.encoded),
        "modulusB64" to Base64.encodeToString(mod, Base64.NO_WRAP),
        "exponentB64" to Base64.encodeToString(exp, Base64.NO_WRAP),
      )
    }

    AsyncFunction("importClientCertificate") { certPem: String, keyPem: String ->
      val cert = CertificateFactory.certFromPem(certPem)
      CertificateFactory.keyFromPem(keyPem)
      val (mod, exp) = CertificateFactory.rsaComponents(cert.publicKey)
      mapOf(
        "modulusB64" to Base64.encodeToString(mod, Base64.NO_WRAP),
        "exponentB64" to Base64.encodeToString(exp, Base64.NO_WRAP),
      )
    }

    AsyncFunction("getPeerPublicKeyComponents") { id: String ->
      val session = sessions[id] ?: throw IllegalStateException("no session $id")
      val (mod, exp) = session.peerKeyComponents()
      mapOf(
        "modulusB64" to Base64.encodeToString(mod, Base64.NO_WRAP),
        "exponentB64" to Base64.encodeToString(exp, Base64.NO_WRAP),
      )
    }

    AsyncFunction("connect") { id: String, host: String, port: Int, certPem: String, keyPem: String ->
      val ctx = TlsSession.sslContext(
        CertificateFactory.certFromPem(certPem), CertificateFactory.keyFromPem(keyPem)
      )
      val session = TlsSession(id,
        onData = { sid, b64 -> sendEvent("onSocketData", mapOf("id" to sid, "base64" to b64)) },
        onState = { sid, st, err, code ->
          sendEvent("onSocketState", buildMap {
            put("id", sid); put("state", st)
            err?.let { put("error", it) }
            code?.let { put("code", it) }
          })
        })
      sessions[id]?.close()
      sessions[id] = session
      session.connect(host, port, ctx)
    }

    Function("send") { id: String, base64: String -> sessions[id]?.send(base64) }
    Function("close") { id: String -> sessions.remove(id)?.close() }

    AsyncFunction("startMicStream") {
      mic?.stop()
      mic = MicStreamer { b64 -> sendEvent("onMicData", mapOf("base64" to b64)) }
      mic?.start()
    }
    Function("stopMicStream") { mic?.stop(); mic = null }

    OnDestroy { sessions.values.forEach { it.close() }; mic?.stop() }
  }
}
