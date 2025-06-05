
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relation: string;
}

interface MoodAlert {
  contacts: Contact[];
  userMood: {
    emoji: string;
    text: string;
    score: number;
  };
  userName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contacts, userMood, userName }: MoodAlert = await req.json();

    console.log("Sending mood alerts for:", userName, "with mood:", userMood);

    // Send emails to all trusted contacts
    const emailPromises = contacts.map(async (contact) => {
      const emailResponse = await resend.emails.send({
        from: "Student Wellbeing App <onboarding@resend.dev>",
        to: [contact.email],
        subject: `Mood Alert: ${userName} needs support`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
              Mood Alert Notification
            </h2>
            
            <p>Dear ${contact.name},</p>
            
            <p>This is an automated alert from the Student Wellbeing App. <strong>${userName}</strong> has logged a mood that indicates they may need support.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Mood Details:</h3>
              <p style="font-size: 18px; margin: 5px 0;">
                <span style="font-size: 24px;">${userMood.emoji}</span> 
                <strong>${userMood.text}</strong> (Score: ${userMood.score}/5)
              </p>
            </div>
            
            <p>As someone listed as a trusted contact, we wanted to make you aware of this situation. Please consider reaching out to ${userName} to offer support.</p>
            
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #1976d2;">Ways to Help:</h4>
              <ul style="color: #424242;">
                <li>Send a caring message or give them a call</li>
                <li>Suggest spending time together</li>
                <li>Encourage them to speak with a counselor if needed</li>
                <li>Listen without judgment</li>
              </ul>
            </div>
            
            <p style="font-size: 14px; color: #666;">
              <em>This alert was sent because ${userName} marked you as a trusted contact with mood alerts enabled. 
              If you believe this was sent in error, please contact ${userName} directly.</em>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              Student Wellbeing App - Supporting Mental Health
            </p>
          </div>
        `,
      });

      console.log(`Email sent to ${contact.name} (${contact.email}):`, emailResponse);
      return emailResponse;
    });

    const results = await Promise.allSettled(emailPromises);
    
    // Check for any failures
    const failures = results.filter(result => result.status === 'rejected');
    const successes = results.filter(result => result.status === 'fulfilled');

    console.log(`Sent ${successes.length} emails successfully, ${failures.length} failed`);

    if (failures.length > 0) {
      console.error("Some emails failed to send:", failures);
    }

    return new Response(JSON.stringify({
      success: true,
      sent: successes.length,
      failed: failures.length,
      results: results
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-mood-alert function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
