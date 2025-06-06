
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Clock, User } from "lucide-react";

const bookingSchema = z.object({
  counselor_id: z.string().min(1, "Please select a counselor"),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be realistic"),
  gender: z.string().min(1, "Please select your gender"),
  contact_number: z.string().min(10, "Contact number must be at least 10 digits"),
  email_address: z.string().email("Please enter a valid email address"),
  occupation: z.string().min(2, "Occupation must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  reason_for_booking: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface Counselor {
  id: string;
  name: string;
  specialization: string | null;
}

interface CounselorBookingFormProps {
  counselors: Counselor[];
  onBookingComplete: () => void;
  selectedCounselorId?: string | null;
}

const CounselorBookingForm = ({ counselors, onBookingComplete, selectedCounselorId }: CounselorBookingFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      counselor_id: selectedCounselorId || "",
      full_name: "",
      age: 18,
      gender: "",
      contact_number: "",
      email_address: user?.email || "",
      occupation: "",
      address: "",
      preferred_date: "",
      preferred_time: "",
      reason_for_booking: "",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a counselor session",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("counselor_bookings")
        .insert({
          user_id: user.id,
          counselor_id: values.counselor_id,
          full_name: values.full_name,
          age: values.age,
          gender: values.gender,
          contact_number: values.contact_number,
          email_address: values.email_address,
          occupation: values.occupation,
          address: values.address,
          preferred_date: values.preferred_date || null,
          preferred_time: values.preferred_time || null,
          reason_for_booking: values.reason_for_booking || null,
        });

      if (error) throw error;

      toast({
        title: "Booking Submitted",
        description: "Your counselor booking request has been submitted successfully. You will be contacted soon.",
      });

      form.reset();
      onBookingComplete();
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to submit booking request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedCounselor = selectedCounselorId 
    ? counselors.find(c => c.id === selectedCounselorId)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={20} />
          Book a Counselor Session
        </CardTitle>
        <CardDescription>
          {selectedCounselor 
            ? `Book a session with ${selectedCounselor.name}` 
            : "Fill out this form to request a counseling session. We'll contact you to confirm the appointment."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="counselor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Counselor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a counselor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {counselors.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id}>
                          {counselor.name} {counselor.specialization && `- ${counselor.specialization}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter your age" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation/Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Student, Engineer, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferred_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Calendar size={16} />
                      Preferred Date (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferred_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Clock size={16} />
                      Preferred Time (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason_for_booking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Booking (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Briefly describe what you'd like to discuss..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CounselorBookingForm;
