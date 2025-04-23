
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface MetricsCardProps {
  title: string;
  value: number;
  description: string;
  status: "normal" | "warning" | "critical";
  icon?: React.ReactNode;
}

const MetricsCard = ({
  title,
  value,
  description,
  status,
  icon
}: MetricsCardProps) => {
  // Convert title to URL-friendly format
  const getRouteFromTitle = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  const statusColors = {
    normal: "text-green-600",
    warning: "text-yellow-600",
    critical: "text-red-600"
  };

  return (
    <Link to={`/${getRouteFromTitle(title)}`} className="block">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}%</div>
          <CardDescription className="mt-1">{description}</CardDescription>
          <p className={`mt-2 text-sm font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MetricsCard;
