package expo.modules.atvsocket

import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import android.util.Base64

class MicStreamer(private val onChunk: (String) -> Unit) {
  private var recorder: AudioRecord? = null
  @Volatile private var running = false

  fun start(sampleRate: Int = 16_000) {
    val minBuf = AudioRecord.getMinBufferSize(
      sampleRate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT
    )
    val rec = AudioRecord(
      MediaRecorder.AudioSource.VOICE_COMMUNICATION, sampleRate,
      AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, minBuf * 2
    )
    recorder = rec
    running = true
    rec.startRecording()
    Thread {
      val buf = ByteArray(4096) // ~128 ms of 16 kHz/16-bit mono
      while (running) {
        val n = rec.read(buf, 0, buf.size)
        if (n > 0) onChunk(Base64.encodeToString(buf.copyOf(n), Base64.NO_WRAP))
      }
      try { rec.stop(); rec.release() } catch (_: Exception) {}
    }.apply { isDaemon = true; start() }
  }

  fun stop() { running = false }
}
