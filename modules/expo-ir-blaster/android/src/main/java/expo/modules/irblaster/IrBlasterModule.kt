package expo.modules.irblaster

import android.content.Context
import android.hardware.ConsumerIrManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class IrBlasterModule : Module() {
  private fun ir(): ConsumerIrManager? =
    appContext.reactContext?.getSystemService(Context.CONSUMER_IR_SERVICE) as? ConsumerIrManager

  override fun definition() = ModuleDefinition {
    Name("IrBlaster")

    AsyncFunction("hasIrEmitter") {
      ir()?.hasIrEmitter() ?: false
    }

    AsyncFunction("getCarrierFrequencyRanges") {
      val manager = ir()
      if (manager == null || !manager.hasIrEmitter()) {
        return@AsyncFunction emptyList<Map<String, Int>>()
      }
      manager.carrierFrequencies.map { range ->
        mapOf("min" to range.minFrequency, "max" to range.maxFrequency)
      }
    }

    AsyncFunction("transmit") { frequency: Int, pattern: List<Int> ->
      val manager = ir() ?: throw IllegalStateException("no IR service")
      if (!manager.hasIrEmitter()) throw IllegalStateException("no IR emitter on this device")
      manager.transmit(frequency, pattern.toIntArray())
    }
  }
}
