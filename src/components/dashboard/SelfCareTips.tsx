
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const SelfCareTips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const tips = [
    {
      title: "Deep Breathing",
      description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8"
    },
    {
      title: "Mindful Walking",
      description: "Take a 10-minute walk while focusing on your surroundings"
    },
    {
      title: "Stress Management",
      description: "Break large tasks into smaller, manageable steps"
    },
    {
      title: "Digital Detox",
      description: "Take short breaks from screens every hour"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="transition-all hover:shadow-md cursor-pointer">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Self-Care Tip</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium text-lg">{tips[currentTipIndex].title}</h3>
          <p className="text-muted-foreground">{tips[currentTipIndex].description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfCareTips;
