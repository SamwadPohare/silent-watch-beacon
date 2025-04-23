
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CounselorOverviewCard = () => {
  const navigate = useNavigate();
  const counselorStats = {
    total: 5,
    available: 3,
    specializations: ["Academic Support", "Mental Health", "Career Guidance"]
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Counselor Availability</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Available Now</span>
            <span className="text-2xl font-bold">{counselorStats.available}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Counselors</span>
            <span className="text-2xl font-bold">{counselorStats.total}</span>
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/leave-application")}
            >
              View All Counselors
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CounselorOverviewCard;
