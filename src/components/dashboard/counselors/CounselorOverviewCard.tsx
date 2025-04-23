
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CounselorOverviewCard = () => {
  const navigate = useNavigate();
  const counselorStats = {
    total: 5,
    available: 3,
    counselors: [
      { name: "Dr. Sarah Wilson", phone: "(555) 123-4567" },
      { name: "Dr. James Smith", phone: "(555) 234-5678" },
      { name: "Dr. Emily Brown", phone: "(555) 345-6789" }
    ],
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
          <div className="border-t pt-3 mt-3">
            <h3 className="text-sm font-medium mb-2">Available Counselors:</h3>
            <div className="space-y-2">
              {counselorStats.counselors.map((counselor, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{counselor.phone}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/available-counselors")}
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
