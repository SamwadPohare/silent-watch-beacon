
package app.lovable.wellbeing;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.app.usage.UsageStats;
import android.provider.Settings;
import android.content.Intent;
import java.util.Calendar;
import java.util.List;
import org.json.JSONArray;

@CapacitorPlugin(name = "Wellbeing")
public class WellbeingPlugin extends Plugin {
    
    @PluginMethod
    public void checkPermission(PluginCall call) {
        Context context = getContext();
        UsageStatsManager usageStatsManager = (UsageStatsManager) context
            .getSystemService(Context.USAGE_STATS_SERVICE);
        
        Calendar calendar = Calendar.getInstance();
        long endTime = calendar.getTimeInMillis();
        calendar.add(Calendar.HOUR_OF_DAY, -1);
        long startTime = calendar.getTimeInMillis();
        
        List<UsageStats> stats = usageStatsManager
            .queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);
        
        boolean hasPermission = !stats.isEmpty();
        JSObject ret = new JSObject();
        ret.put("hasPermission", hasPermission);
        call.resolve(ret);
    }

    @PluginMethod
    public void requestPermission(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
        
        JSObject ret = new JSObject();
        ret.put("opened", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void getScreenTime(PluginCall call) {
        try {
            Context context = getContext();
            UsageStatsManager usageStatsManager = (UsageStatsManager) context
                .getSystemService(Context.USAGE_STATS_SERVICE);

            Calendar calendar = Calendar.getInstance();
            long endTime = calendar.getTimeInMillis();
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            long startTime = calendar.getTimeInMillis();

            List<UsageStats> stats = usageStatsManager
                .queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

            if (stats.isEmpty()) {
                JSObject ret = new JSObject();
                ret.put("error", "permission_required");
                call.resolve(ret);
                return;
            }

            long totalTimeInMinutes = 0;
            JSONArray appUsage = new JSONArray();

            for (UsageStats usageStats : stats) {
                long timeInForeground = usageStats.getTotalTimeInForeground() / 60000; // Convert to minutes
                totalTimeInMinutes += timeInForeground;

                if (timeInForeground > 0) {
                    JSObject appData = new JSObject();
                    appData.put("packageName", usageStats.getPackageName());
                    appData.put("minutes", timeInForeground);
                    appData.put("lastTimeUsed", usageStats.getLastTimeUsed());
                    appData.put("totalTimeInForeground", usageStats.getTotalTimeInForeground());
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
