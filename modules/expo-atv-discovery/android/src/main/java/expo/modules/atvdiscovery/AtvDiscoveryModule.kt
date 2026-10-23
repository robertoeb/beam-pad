package expo.modules.atvdiscovery

import android.content.Context
import android.net.nsd.NsdManager
import android.net.nsd.NsdServiceInfo
import android.net.wifi.WifiManager
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AtvDiscoveryModule : Module() {
  private var nsd: NsdManager? = null
  private var multicastLock: WifiManager.MulticastLock? = null
  private var discoveryListener: NsdManager.DiscoveryListener? = null
  private var restartRequested = false
  private val resolving = mutableSetOf<String>()

  override fun definition() = ModuleDefinition {
    Name("AtvDiscovery")
    Events("onDiscoveryEvent")

    AsyncFunction("startDiscovery") {
      val ctx = appContext.reactContext ?: return@AsyncFunction null
      val nsdMgr = ctx.getSystemService(Context.NSD_SERVICE) as NsdManager
      nsd = nsdMgr

      // If a discovery session is already running (re-entered screen, "Scan
      // again"), stop it and wait for onDiscoveryStopped before starting a new
      // one. Android NSD throws if discoverServices() is called while a
      // discovery for the same type is still active.
      val active = discoveryListener
      if (active != null) {
        restartRequested = true
        try {
          nsdMgr.stopServiceDiscovery(active)
        } catch (_: Exception) {
          // stop failed synchronously; the session is considered gone
          restartRequested = false
          startNewDiscovery(nsdMgr)
        }
        return@AsyncFunction null
      }
      startNewDiscovery(nsdMgr)
      null
    }

    Function("stopDiscovery") {
      restartRequested = false
      discoveryListener?.let {
        try {
          nsd?.stopServiceDiscovery(it)
        } catch (_: Exception) {}
      }
      discoveryListener = null
      resolving.clear()
      multicastLock?.let {
        try {
          it.release()
        } catch (_: Exception) {}
      }
      multicastLock = null
    }

    OnDestroy {
      restartRequested = false
      try {
        nsd?.stopServiceDiscovery(discoveryListener)
      } catch (_: Exception) {}
      try {
        multicastLock?.release()
      } catch (_: Exception) {}
    }
  }

  private fun startNewDiscovery(nsdMgr: NsdManager) {
    // Drop stale resolve bookkeeping so re-discovered services are re-resolved.
    resolving.clear()

    val wifi = appContext.reactContext
      ?.applicationContext
      ?.getSystemService(Context.WIFI_SERVICE) as WifiManager
    if (multicastLock == null) {
      multicastLock = wifi.createMulticastLock("beampad").apply {
        setReferenceCounted(false)
        acquire()
      }
    }

    val listener = object : NsdManager.DiscoveryListener {
      override fun onServiceFound(info: NsdServiceInfo) {
        emit(mapOf("type" to "found", "name" to info.serviceName))
        if (resolving.add(info.serviceName)) {
          nsd?.resolveService(info, object : NsdManager.ResolveListener {
            override fun onResolveFailed(info: NsdServiceInfo, code: Int) {
              resolving.remove(info.serviceName)
              emit(mapOf("type" to "resolveFailed", "name" to info.serviceName, "error" to code.toString()))
            }
            override fun onServiceResolved(info: NsdServiceInfo) {
              resolving.remove(info.serviceName)
              val txt = if (Build.VERSION.SDK_INT >= 34) {
                info.attributes.mapValues { (_, v) -> v?.let { String(it) } ?: "" }
              } else {
                emptyMap()
              }
              emit(mapOf(
                "type" to "resolved",
                "name" to info.serviceName,
                "host" to (info.host?.hostAddress ?: ""),
                "port" to info.port,
                "txt" to txt,
              ))
            }
          })
        }
      }
      override fun onServiceLost(info: NsdServiceInfo) {
        resolving.remove(info.serviceName)
        emit(mapOf("type" to "lost", "name" to info.serviceName))
      }
      override fun onDiscoveryStarted(serviceType: String) {}
      override fun onDiscoveryStopped(serviceType: String) {
        // If a restart was requested while the previous session was running,
        // kick off the fresh discovery now that the old one has fully stopped.
        if (restartRequested) {
          restartRequested = false
          val ctx = appContext.reactContext ?: return
          val nsdMgr = ctx.getSystemService(Context.NSD_SERVICE) as NsdManager
          startNewDiscovery(nsdMgr)
        }
      }
      override fun onStartDiscoveryFailed(serviceType: String, errorCode: Int) {
        emit(mapOf("type" to "error", "error" to "start failed: $errorCode"))
      }
      override fun onStopDiscoveryFailed(serviceType: String, errorCode: Int) {}
    }
    discoveryListener = listener
    try {
      nsd?.discoverServices("_androidtvremote2._tcp.", NsdManager.PROTOCOL_DNS_SD, listener)
    } catch (e: Exception) {
      emit(mapOf("type" to "error", "error" to e.message))
    }
  }

  private fun emit(payload: Map<String, Any?>) =
    sendEvent("onDiscoveryEvent", payload)
}
