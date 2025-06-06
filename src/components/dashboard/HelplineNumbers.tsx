
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HelplineNumbers = () => {
  const helplines = [
    { name: "National Suicide Prevention Lifeline", number: "988", country: "US" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", country: "US" },
    { name: "NIMHANS Mental Health Helpline", number: "080-46110007", country: "India" },
    { name: "iCall Helpline", number: "022-25521111", country: "India" },
    { name: "Vandrevala Foundation", number: "1860-2662-345", country: "India" },
    { name: "AASRA", number: "91-9820466726", country: "India" },
    { name: "Sneha India Foundation", number: "044-24640050", country: "India" },
    { name: "Lifeline Bangladesh", number: "16123", country: "Bangladesh" },
    { name: "Sumaitri", number: "011-23389090", country: "India" },
    { name: "Pakistan National Mental Health Helpline", number: "+92 111 47283", country: "Pakistan" },
    { name: "Sri Lanka Sumithrayo", number: "+94 11 269 6666", country: "Sri Lanka" },
    { name: "Blue Cross Nepal", number: "+977 1-4228525", country: "Nepal" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Emergency Helplines</CardTitle>
        <CardDescription>
          Help is available 24/7 if you need immediate support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {helplines.map((helpline, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium text-sm">{helpline.name}</p>
                <p className="text-xs text-muted-foreground">{helpline.country}</p>
              </div>
              <a 
                href={`tel:${helpline.number.replace(/\D/g,'')}`} 
                className="flex items-center text-sm font-medium text-primary hover:underline"
              >
                {helpline.number}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HelplineNumbers;
