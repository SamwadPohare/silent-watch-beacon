
import { Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HelplineNumbers = () => {
  const helplines = [
    {
      title: "24/7 Crisis Helpline",
      number: "1-800-273-8255",
      description: "Available 24 hours a day"
    },
    {
      title: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to connect with a Crisis Counselor"
    },
    {
      title: "Student Counseling Services",
      number: "(555) 123-4567",
      description: "Schedule an appointment with a counselor"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Emergency Helplines</CardTitle>
        </div>
        <CardDescription>24/7 Support Available</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {helplines.map((helpline, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <h4 className="font-medium">{helpline.title}</h4>
              <p className="text-lg font-bold text-primary">{helpline.number}</p>
              <p className="text-sm text-muted-foreground">{helpline.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HelplineNumbers;
