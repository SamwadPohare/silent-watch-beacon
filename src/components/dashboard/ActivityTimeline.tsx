
import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: string;
  title: string;
  time: string;
  description: string;
  status: "normal" | "warning" | "critical";
}

interface ActivityTimelineProps {
  items: TimelineItem[];
}

const ActivityTimeline = ({ items }: ActivityTimelineProps) => {
  const getStatusColor = (status: "normal" | "warning" | "critical") => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <CalendarClock size={18} className="text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="relative pl-8">
                <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                
                <div className="text-sm">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground mb-1">{item.time}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
