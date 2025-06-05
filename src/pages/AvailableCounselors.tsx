
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Phone, MessageSquare, Calendar, Star } from "lucide-react";

const AvailableCounselors = () => {
  const counselors = [
    { 
      id: 1, 
      name: "Dr. Sarah Johnson", 
      specialty: "Anxiety & Depression", 
      rating: 4.9, 
      availability: "Available Now",
      experience: "8 years"
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      specialty: "Academic Stress", 
      rating: 4.8, 
      availability: "Available at 2 PM",
      experience: "6 years"
    },
    { 
      id: 3, 
      name: "Dr. Emily Rodriguez", 
      specialty: "Relationship Issues", 
      rating: 4.9, 
      availability: "Available Tomorrow",
      experience: "10 years"
    },
  ];

  return (
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Available Counselors</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Immediate Support</CardTitle>
            <CardDescription>24/7 Crisis helpline available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="destructive">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Helpline
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Call immediately if you're in crisis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Available Today</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-xs text-muted-foreground">Online Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {counselors.map((counselor) => (
          <Card key={counselor.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">{counselor.name}</CardTitle>
                  <CardDescription>{counselor.specialty}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{counselor.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium">{counselor.experience}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${
                  counselor.availability.includes("Available Now") 
                    ? "text-green-600" 
                    : "text-yellow-600"
                }`}>
                  {counselor.availability}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Book
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Self-Help Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Guided Meditation
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Mood Tracking
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Support Groups
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvailableCounselors;
