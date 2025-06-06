
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CounselorOverviewCard = () => {
  const navigate = useNavigate();
  const counselors = [
    { name: "Dr. Meera Shah", phone: "+91 98765 43210", location: "Mumbai" },
    { name: "Dr. Arjun Iyer", phone: "+91 98220 11234", location: "Chennai" },
    { name: "Ms. Ananya Roy", phone: "+91 99300 44556", location: "Kolkata" }
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
            <div key={index} className="flex flex-col text-sm">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                <span className="font-medium">{counselor.name}</span>
              </div>
              <span className="text-muted-foreground text-xs ml-5">
                {counselor.phone} • {counselor.location}
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
