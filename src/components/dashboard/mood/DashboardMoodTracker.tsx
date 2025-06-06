import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Mic, MicOff, Save, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const moodEmojis = [
  { emoji: "😢", text: "Very Sad", score: 1 },
  { emoji: "😞", text: "Sad", score: 2 },
  { emoji: "😐", text: "Neutral", score: 3 },
  { emoji: "😊", text: "Happy", score: 4 },
  { emoji: "😄", text: "Very Happy", score: 5 },
];

const DashboardMoodTracker = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<typeof moodEmojis[0] | null>(null);
  const [notes, setNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRecentMoods();
    }
  }, [user]);

  const fetchRecentMoods = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("mood_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching moods:", error);
    } else {
      setRecentMoods(data || []);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const saveMoodEntry = async () => {
    if (!user || !selectedMood) {
      toast({
        title: "Error",
        description: "Please select a mood",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create mood log entry
      const { data: moodLog, error: moodError } = await supabase
        .from("mood_logs")
        .insert({
          user_id: user.id,
          mood_emoji: selectedMood.emoji,
          mood_text: selectedMood.text,
          mood_score: selectedMood.score,
          notes: notes,
        })
        .select()
        .single();

      if (moodError) throw moodError;

      // Upload voice recording if exists
      if (audioBlob && moodLog) {
        const fileName = `${user.id}/${moodLog.id}-${Date.now()}.webm`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("voice-recordings")
          .upload(fileName, audioBlob);

        if (uploadError) throw uploadError;

        // Save voice log entry
        const { error: voiceError } = await supabase
          .from("voice_logs")
          .insert({
            user_id: user.id,
            mood_log_id: moodLog.id,
            audio_url: uploadData.path,
            duration_seconds: 0,
          });

        if (voiceError) throw voiceError;
      }

      // If mood is low (score 1 or 2), trigger email notifications
      if (selectedMood.score <= 2) {
        await triggerMoodAlert(selectedMood);
      }

      toast({
        title: "Mood Saved",
        description: "Your mood has been recorded successfully",
      });

      // Reset form
      setSelectedMood(null);
      setNotes("");
      setAudioBlob(null);
      fetchRecentMoods();

    } catch (error: any) {
      console.error("Error saving mood:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save mood",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerMoodAlert = async (mood: typeof moodEmojis[0]) => {
    try {
      // Fetch trusted contacts with mood alerts enabled
      const { data: contacts, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("user_id", user?.id)
        .eq("mood_alert_enabled", true)
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching contacts:", error);
        toast({
          title: "Alert Error",
          description: "Failed to fetch trusted contacts",
          variant: "destructive",
        });
        return;
      }

      if (!contacts?.length) {
        toast({
          title: "No Alert Contacts",
          description: "No trusted contacts are set up to receive mood alerts. You can add them in your contacts settings.",
        });
        return;
      }

      // Call edge function to send email alerts
      const { data: emailResult, error: emailError } = await supabase.functions.invoke("send-mood-alert", {
        body: {
          contacts: contacts,
          userMood: mood,
          userName: `${user?.user_metadata?.first_name || "User"}`,
        },
      });

      if (emailError) {
        console.error("Error sending mood alerts:", emailError);
        toast({
          title: "Email Alert Failed",
          description: `Failed to send mood alerts: ${emailError.message}`,
          variant: "destructive",
        });
      } else {
        // Show success notification with contact details
        const contactNames = contacts.map(c => c.name).join(", ");
        toast({
          title: "Mood Alerts Sent",
          description: `Alert emails have been sent to your trusted contacts: ${contactNames}`,
        });
        console.log("Mood alert emails sent successfully:", emailResult);
      }
    } catch (error) {
      console.error("Error triggering mood alert:", error);
      toast({
        title: "Alert Error",
        description: "An unexpected error occurred while sending mood alerts",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
          <Heart size={20} className="text-pink-500" />
          Mood Tracker
        </h2>
        <p className="text-muted-foreground">
          Track your daily mood with emoji, notes, and voice recordings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling right now?</CardTitle>
          <CardDescription>
            Select your current mood and add any notes or voice recordings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Your Mood</h3>
            <div className="grid grid-cols-5 gap-2">
              {moodEmojis.map((mood) => (
                <Button
                  key={mood.score}
                  variant={selectedMood?.score === mood.score ? "default" : "outline"}
                  className="h-16 flex flex-col gap-1"
                  onClick={() => setSelectedMood(mood)}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-xs">{mood.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium mb-2">Notes (Optional)</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional thoughts or notes about your mood..."
              rows={2}
            />
          </div>

          {/* Voice Recording */}
          <div>
            <h3 className="text-sm font-medium mb-2">Voice Note (Optional)</h3>
            <div className="flex items-center gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              {audioBlob && (
                <Badge variant="secondary">Voice note recorded</Badge>
              )}
            </div>
          </div>

          {/* Save Button */}
          <Button 
            onClick={saveMoodEntry} 
            disabled={!selectedMood || loading}
            className="w-full"
          >
            <Save size={16} className="mr-2" />
            {loading ? "Saving..." : "Save Mood Entry"}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Moods */}
      {recentMoods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Mood Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentMoods.map((mood) => (
                <div key={mood.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{mood.mood_emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{mood.mood_text}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(mood.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Score: {mood.mood_score}/5</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardMoodTracker;
