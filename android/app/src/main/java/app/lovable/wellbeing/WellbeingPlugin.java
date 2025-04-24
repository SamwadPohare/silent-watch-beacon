
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
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import java.util.Calendar;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import org.json.JSONArray;

@CapacitorPlugin(name = "Wellbeing")
public class WellbeingPlugin extends Plugin {
    
    private boolean hasUsageStatsPermission() {
        Context context = getContext();
        UsageStatsManager usageStatsManager = (UsageStatsManager) context
            .getSystemService(Context.USAGE_STATS_SERVICE);
        
        Calendar calendar = Calendar.getInstance();
        long endTime = calendar.getTimeInMillis();
        calendar.add(Calendar.HOUR_OF_DAY, -1);
        long startTime = calendar.getTimeInMillis();
        
        List<UsageStats> stats = usageStatsManager
            .queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);
        
        return stats != null && !stats.isEmpty();
    }

    private String getAppName(String packageName) {
        try {
            PackageManager packageManager = getContext().getPackageManager();
            ApplicationInfo applicationInfo = packageManager.getApplicationInfo(packageName, 0);
            return (String) packageManager.getApplicationLabel(applicationInfo);
        } catch (PackageManager.NameNotFoundException e) {
            return packageName;
        }
    }
    
    @PluginMethod
    public void checkPermission(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("hasPermission", hasUsageStatsPermission());
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
            if (!hasUsageStatsPermission()) {
                JSObject ret = new JSObject();
                ret.put("error", "permission_required");
                call.resolve(ret);
                return;
            }

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

            // Sort by usage time
            Collections.sort(stats, new Comparator<UsageStats>() {
                @Override
                public int compare(UsageStats us1, UsageStats us2) {
                    return Long.compare(us2.getTotalTimeInForeground(), us1.getTotalTimeInForeground());
                }
            });

            long totalTimeInMinutes = 0;
            JSONArray appUsage = new JSONArray();

            for (UsageStats usageStats : stats) {
                long timeInForeground = usageStats.getTotalTimeInForeground() / 60000; // Convert to minutes
                
                if (timeInForeground > 0) {
                    totalTimeInMinutes += timeInForeground;
                    
                    JSObject appData = new JSObject();
                    String packageName = usageStats.getPackageName();
                    appData.put("packageName", packageName);
                    appData.put("appName", getAppName(packageName));
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
            JSObject ret = new JSObject();
            ret.put("error", "system_error");
            call.resolve(ret);
        }
    }
}
