
import { Phone, PhoneCall, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HelplineNumbers = () => {
  const helplines = [
    {
      title: "24/7 Crisis Helpline",
      number: "1-800-273-8255",
      description: "National Suicide Prevention Lifeline",
      icon: <PhoneCall className="h-4 w-4 text-primary" />
    },
    {
      title: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to connect with a Crisis Counselor",
      icon: <Phone className="h-4 w-4 text-primary" />
    },
    {
      title: "Student Counseling Services",
      number: "(555) 123-4567",
      description: "Schedule an appointment with a counselor",
      icon: <HelpCircle className="h-4 w-4 text-primary" />
    }
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number.replace(/[^0-9]/g, '')}`);
  };

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Emergency Helplines</CardTitle>
        </div>
        <CardDescription>24/7 Support Available</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {helplines.map((helpline, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="mt-1">{helpline.icon}</div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">{helpline.title}</h4>
                <p className="text-base font-semibold text-primary">{helpline.number}</p>
                <p className="text-xs text-muted-foreground">{helpline.description}</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-1"
                onClick={() => handleCall(helpline.number)}
              >
                Call
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HelplineNumbers;
