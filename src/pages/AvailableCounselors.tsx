
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Phone, MessageSquare, Calendar, Star, Award, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CounselorBookingForm from "@/components/counselors/CounselorBookingForm";

interface Counselor {
  id: string;
  name: string;
  specialization: string | null;
  phone: string;
  email: string;
  available_hours: string | null;
  experience?: string;
  expertise?: string[];
}

const AvailableCounselors = () => {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);

  // Mock data to enhance counselor information
  const counselorEnhancements = {
    "Dr. Sarah Johnson": {
      experience: "8 years",
      expertise: ["Anxiety", "Depression", "Stress Management"]
    },
    "Dr. Michael Chen": {
      experience: "12 years", 
      expertise: ["Academic Counseling", "Career Guidance", "Life Coaching"]
    },
    "Dr. Emily Rodriguez": {
      experience: "6 years",
      expertise: ["Relationship Counseling", "Family Therapy", "Communication Skills"]
    },
    "Dr. David Kim": {
      experience: "10 years",
      expertise: ["Trauma Therapy", "PTSD", "Crisis Intervention"]
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    const { data, error } = await supabase
      .from("counselors")
      .select("*")
      .order("name");

    if (!error && data) {
      // Enhance counselor data with experience and expertise
      const enhancedCounselors = data.map(counselor => ({
        ...counselor,
        experience: counselorEnhancements[counselor.name as keyof typeof counselorEnhancements]?.experience || "5 years",
        expertise: counselorEnhancements[counselor.name as keyof typeof counselorEnhancements]?.expertise || ["General Counseling"]
      }));
      setCounselors(enhancedCounselors);
    }
    setLoading(false);
  };

  const handleBookingClick = (counselorId: string) => {
    setSelectedCounselor(counselorId);
    setShowBookingForm(true);
  };

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    setSelectedCounselor(null);
  };

  if (loading) {
    return <div className="text-center p-4">Loading counselors...</div>;
  }

  if (showBookingForm) {
    return (
      <div className="space-y-4 p-4 pb-20 max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => setShowBookingForm(false)}
          className="mb-4"
        >
          ← Back to Counselors
        </Button>
        <CounselorBookingForm 
          counselors={counselors}
          onBookingComplete={handleBookingComplete}
          selectedCounselorId={selectedCounselor}
        />
      </div>
    );
  }

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
            <CardTitle className="text-lg font-bold">Counselor Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{counselors.length}</p>
                <p className="text-xs text-muted-foreground">Total Counselors</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">{counselors.length}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {counselors.map((counselor) => (
          <Card key={counselor.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-bold">{counselor.name}</CardTitle>
                  <CardDescription className="text-sm">{counselor.specialization || "General Counseling"}</CardDescription>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-600">{counselor.experience} experience</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600">Expertise:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {counselor.expertise?.map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.{Math.floor(Math.random() * 3) + 7}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{counselor.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-xs">{counselor.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hours:</span>
                  <span className="font-medium text-xs">{counselor.available_hours || "Mon-Fri 9AM-5PM"}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleBookingClick(counselor.id)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Book Session
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
