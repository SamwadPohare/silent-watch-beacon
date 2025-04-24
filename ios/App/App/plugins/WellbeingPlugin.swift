
import Foundation
import Capacitor
import DeviceActivity

@objc(WellbeingPlugin)
public class WellbeingPlugin: CAPPlugin {
    @objc func getScreenTime(_ call: CAPPluginCall) {
        // Note: This requires specific entitlements and user authorization
        if #available(iOS 15.0, *) {
            let center = DeviceActivityCenter()
            let schedule = DeviceActivitySchedule(
                intervalStart: DateComponents(hour: 0, minute: 0),
                intervalEnd: DateComponents(hour: 23, minute: 59),
                repeats: true
            )
            
            center.startMonitoring(schedule) { event in
                let totalMinutes = event.totalDuration / 60
                var appUsage: [[String: Any]] = []
                
                for (bundleId, duration) in event.applicationActivityDurations {
                    appUsage.append([
                        "packageName": bundleId,
                        "minutes": duration / 60
                    ])
                }
                
                call.resolve([
                    "totalMinutes": totalMinutes,
                    "appUsage": appUsage
                ])
            }
        } else {
            call.reject("Screen Time API requires iOS 15.0 or later")
        }
    }
}

