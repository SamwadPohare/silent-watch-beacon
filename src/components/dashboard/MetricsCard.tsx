
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricsCardProps {
  title: string;
  value: number;
  description?: string;
  status: "normal" | "warning" | "critical";
  icon?: React.ReactNode;
}

const MetricsCard = ({ title, value, description, status, icon }: MetricsCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "warning":
        return "text-amber-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-green-500";
    }
  };

  const getProgressColor = () => {
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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className={getStatusColor()}>{icon}</div>}
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}%</div>
          <div className={`text-xs font-medium ${getStatusColor()}`}>
            {status === "normal" ? "Healthy" : status === "warning" ? "Warning" : "Critical"}
          </div>
        </div>
        <Progress 
          value={value} 
          className={`h-1.5 mt-2 ${getProgressColor()}`}
        />
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
