
package app.lovable.wellbeing;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.app.usage.UsageStats;
import java.util.Calendar;
import java.util.List;
import org.json.JSONArray;

@CapacitorPlugin(name = "Wellbeing")
public class WellbeingPlugin extends Plugin {
    @PluginMethod
    public void getScreenTime(PluginCall call) {
        try {
            UsageStatsManager usageStatsManager = (UsageStatsManager) getContext()
                .getSystemService(Context.USAGE_STATS_SERVICE);

            Calendar calendar = Calendar.getInstance();
            long endTime = calendar.getTimeInMillis();
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            long startTime = calendar.getTimeInMillis();

            List<UsageStats> stats = usageStatsManager
                .queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

            long totalTimeInMinutes = 0;
            JSONArray appUsage = new JSONArray();

            for (UsageStats usageStats : stats) {
                long timeInForeground = usageStats.getTotalTimeInForeground() / 60000; // Convert to minutes
                totalTimeInMinutes += timeInForeground;

                if (timeInForeground > 0) {
                    JSObject appData = new JSObject();
                    appData.put("packageName", usageStats.getPackageName());
                    appData.put("minutes", timeInForeground);
                    appUsage.put(appData);
                }
            }

            JSObject ret = new JSObject();
            ret.put("totalMinutes", totalTimeInMinutes);
            ret.put("appUsage", appUsage);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Failed to get usage stats", e);
        }
    }
}

