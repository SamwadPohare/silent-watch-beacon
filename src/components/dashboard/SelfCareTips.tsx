
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const SelfCareTips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  
  const tips = [
    {
      title: "Deep Breathing",
      description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8",
      bgColor: "bg-blue-50"
    },
    {
      title: "Mindful Walking",
      description: "Take a 10-minute walk while focusing on your surroundings",
      bgColor: "bg-green-50"
    },
    {
      title: "Stress Management",
      description: "Break large tasks into smaller, manageable steps",
      bgColor: "bg-purple-50"
    },
    {
      title: "Digital Detox",
      description: "Take short breaks from screens every hour",
      bgColor: "bg-amber-50"
    },
    {
      title: "Gratitude Practice",
      description: "Note three things you're grateful for before going to bed",
      bgColor: "bg-indigo-50"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFadeState("fade-out");
      
      // After fade out completes, change tip and fade in
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
        setFadeState("fade-in");
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [tips.length]);

  const currentTip = tips[currentTipIndex];

  return (
    <Card className={`transition-all hover:shadow-md cursor-pointer ${currentTip.bgColor}`}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Self-Care Tip</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-2 transition-opacity duration-500 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="font-medium text-lg">{currentTip.title}</h3>
          <p className="text-muted-foreground">{currentTip.description}</p>
          <div className="flex pt-2">
            {tips.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 w-1.5 rounded-full mx-1 ${index === currentTipIndex ? 'bg-primary' : 'bg-primary/30'}`} 
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfCareTips;
