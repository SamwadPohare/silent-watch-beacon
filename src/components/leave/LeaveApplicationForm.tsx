
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import ContactSelect from "./ContactSelect";

const LeaveApplicationForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [contactId, setContactId] = useState("");
  const [isMedicalLeave, setIsMedicalLeave] = useState(false);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      let certificateUrl = null;
      if (isMedicalLeave && certificateFile) {
        const fileExt = certificateFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('medical-certificates')
          .upload(fileName, certificateFile);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('medical-certificates')
          .getPublicUrl(fileName);
          
        certificateUrl = publicUrl;
      }

      const { error } = await supabase.from("leave_applications").insert({
        user_id: user.id,
        reason,
        start_date: startDate,
        end_date: endDate,
        additional_notes: notes,
        contact_id: contactId || null,
        is_medical_leave: isMedicalLeave,
        medical_certificate_url: certificateUrl,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Leave application submitted successfully.",
      });
      
      // Reset form
      setReason("");
      setStartDate("");
      setEndDate("");
      setNotes("");
      setContactId("");
      setIsMedicalLeave(false);
      setCertificateFile(null);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to submit leave application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Leave Application</CardTitle>
        <CardDescription>Fill in the details for your leave request</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Leave</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <ContactSelect 
            value={contactId} 
            onChange={setContactId} 
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="medical-leave"
              checked={isMedicalLeave}
              onCheckedChange={(checked) => setIsMedicalLeave(checked as boolean)}
            />
            <Label htmlFor="medical-leave">This is a medical leave</Label>
          </div>

          {isMedicalLeave && (
            <div className="space-y-2">
              <Label htmlFor="certificate">Medical Certificate</Label>
              <Input
                id="certificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LeaveApplicationForm;
