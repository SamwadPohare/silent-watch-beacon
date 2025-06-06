
import { useState } from "react";
import { Bell, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/types";

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Abnormal Sleep Pattern Detected",
      message: "We've noticed unusual sleep patterns over the past 3 days. Consider establishing a more consistent sleep schedule.",
      timestamp: "2023-04-18T14:30:00",
      severity: "medium",
      isRead: false
    },
    {
      id: "2",
      title: "Low Academic Engagement",
      message: "Your class attendance and participation metrics have dropped significantly. Consider reaching out to your academic advisor.",
      timestamp: "2023-04-17T09:15:00",
      severity: "high",
      isRead: false
    },
    {
      id: "3",
      title: "Reduced Social Interaction",
      message: "We've noticed a reduction in your social communication patterns. Consider connecting with friends or joining campus activities.",
      timestamp: "2023-04-15T16:45:00",
      severity: "medium",
      isRead: true
    },
    {
      id: "4",
      title: "Wellness Check Complete",
      message: "Your weekly wellness check has been completed. Most metrics are within healthy ranges.",
      timestamp: "2023-04-10T11:20:00",
      severity: "low",
      isRead: true
    }
  ]);

  const markAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts(
      alerts.map((alert) => ({ ...alert, isRead: true }))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Stay informed about important changes to your wellness metrics.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transition-all ${!alert.isRead ? "border-l-4 border-l-primary" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <Bell
                      size={18}
                      className={`mt-1 ${
                        alert.severity === "high"
                          ? "text-red-500"
                          : alert.severity === "medium"
                          ? "text-amber-500"
                          : "text-green-500"
                      }`}
                    />
                    <div>
                      <CardTitle className="text-base font-medium">
                        {alert.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {formatDate(alert.timestamp)}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                    {alert.severity === "high"
                      ? "High Priority"
                      : alert.severity === "medium"
                      ? "Medium Priority"
                      : "Low Priority"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{alert.message}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                {!alert.isRead ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => markAsRead(alert.id)}
                  >
                    Mark as Read
                  </Button>
                ) : (
                  <span />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() => deleteAlert(alert.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
            <Bell size={32} className="text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No Alerts</h3>
            <p className="text-center text-muted-foreground mb-4">
              You don't have any alerts or notifications at this time.
            </p>
          </div>
        )}

        {alerts.length > 0 && (
          <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-2">
            <Info size={16} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Alerts are generated based on changes in your wellness metrics. Adjust sensitivity in Settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
