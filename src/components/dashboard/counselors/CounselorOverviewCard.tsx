
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CounselorOverviewCard = () => {
  const navigate = useNavigate();
  const counselors = [
    { name: "Dr. Sarah Wilson", phone: "(555) 123-4567" },
    { name: "Dr. James Smith", phone: "(555) 234-5678" },
    { name: "Dr. Emily Brown", phone: "(555) 345-6789" }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Counselor Contacts</CardTitle>
        <Phone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {counselors.map((counselor, index) => (
            <div key={index} className="flex items-center text-sm">
              <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">
                {counselor.name}: {counselor.phone}
              </span>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-3"
            onClick={() => navigate("/available-counselors")}
          >
            View All Counselors
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CounselorOverviewCard;
