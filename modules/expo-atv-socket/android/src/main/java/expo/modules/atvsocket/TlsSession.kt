package expo.modules.atvsocket

import android.util.Base64
import java.security.KeyStore
import java.security.SecureRandom
import java.security.cert.X509Certificate
import javax.net.ssl.*

class TlsSession(
  val id: String,
  private val onData: (String, String) -> Unit,
  private val onState: (String, String, String?, String?) -> Unit
) {
  private var socket: SSLSocket? = null
  @Volatile private var running = false
  private val sendLock = Any()

  companion object {
    private fun trustAll() = arrayOf<TrustManager>(object : X509TrustManager {
      override fun checkClientTrusted(c: Array<X509Certificate>?, a: String?) {}
      override fun checkServerTrusted(c: Array<X509Certificate>?, a: String?) {}
      override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
    })

    fun sslContext(cert: X509Certificate, key: java.security.PrivateKey): SSLContext {
      val ks = KeyStore.getInstance("PKCS12").apply { load(null) }
      ks.setKeyEntry("client", key, CharArray(0), arrayOf(cert))
      val kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm())
      kmf.init(ks, CharArray(0))
      return SSLContext.getInstance("TLS").apply {
        init(kmf.keyManagers, trustAll(), SecureRandom())
      }
    }

    fun codeOf(e: Exception): String = when (e) {
      is SSLHandshakeException -> "TLS_HANDSHAKE"
      is java.net.SocketTimeoutException -> "HOST_UNREACHABLE"
      is java.net.ConnectException ->
        if (e.message?.contains("refused") == true) "PORT_CLOSED" else "HOST_UNREACHABLE"
      is java.net.NoRouteToHostException -> "HOST_UNREACHABLE"
      else -> "UNKNOWN"
    }
  }

  fun connect(host: String, port: Int, ctx: SSLContext) {
    val s = ctx.socketFactory.createSocket() as SSLSocket
    s.soTimeout = 0
    try {
      s.connect(java.net.InetSocketAddress(host, port), 10_000)
      s.startHandshake()
    } catch (e: Exception) {
      val code = codeOf(e)
      onState(id, "error", e.message, code)
      try { s.close() } catch (_: Exception) {}
      return
    }
    socket = s
    running = true
    onState(id, "open", null, null)
    Thread {
      val buf = ByteArray(16 * 1024)
      try {
        val input = s.inputStream
        while (running) {
          val n = input.read(buf)
          if (n < 0) break
          onData(id, Base64.encodeToString(buf.copyOf(n), Base64.NO_WRAP))
        }
        onState(id, "closed", null, null)
      } catch (e: Exception) {
        if (running) onState(id, "error", e.message, codeOf(e))
      }
    }.apply { isDaemon = true; start() }
  }

  fun peerKeyComponents(): Pair<ByteArray, ByteArray> {
    val s = socket ?: throw IllegalStateException("not connected")
    val peer = s.session.peerCertificates[0].publicKey
    return CertificateFactory.rsaComponents(peer)
  }

  fun send(base64: String) {
    // Guarded: send() runs on the JS thread and races close(), which clears
    // `running` and shuts the socket. Without the check + catch, a write
    // landing mid-teardown throws into JS or writes to a dead socket.
    // Early sends (before the handshake completes) are dropped: the protocol
    // layer only sends after 'open' today.
    synchronized(sendLock) {
      if (!running) return
      try {
        val bytes = Base64.decode(base64, Base64.NO_WRAP)
        socket?.outputStream?.apply { write(bytes); flush() }
      } catch (_: Exception) {}
    }
  }

  fun close() {
    running = false
    try { socket?.close() } catch (_: Exception) {}
  }
}
