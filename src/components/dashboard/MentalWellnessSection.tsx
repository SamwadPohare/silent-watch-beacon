
import { Brain, Heart, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MentalWellnessSection = () => {
  const wellnessResources = [
    {
      title: "Breathing Techniques",
      description: "Simple breathing exercises to reduce stress and anxiety",
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      url: "#breathing"
    },
    {
      title: "Mindfulness Practices",
      description: "Daily mindfulness activities to improve mental clarity",
      icon: <Brain className="h-5 w-5 text-violet-500" />,
      url: "#mindfulness"
    },
    {
      title: "Stress Management",
      description: "Effective strategies to manage academic and social stress",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      url: "#stress"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Wellness Resources</CardTitle>
        <CardDescription>
          Tools and resources to support your mental health journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wellnessResources.map((resource, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <h3 className="font-medium text-sm mb-2">Weekly Wellness Tip</h3>
            <p className="text-sm italic border-l-2 border-primary/30 pl-3 py-1">
              "Taking just 5 minutes each day for conscious breathing can significantly reduce stress levels and improve focus."
            </p>
          </div>
          
          <div className="pt-2">
            <Link to="/SleepQuality">
              <Button variant="outline" className="w-full flex items-center justify-between">
                <span>View Sleep Quality Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="pt-1">
            <Link to="/ActivityPatterns">
              <Button variant="outline" className="w-full flex items-center justify-between">
                <span>View Activity Patterns</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentalWellnessSection;
