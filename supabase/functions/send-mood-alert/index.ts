
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MoodAlertRequest {
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    relation: string;
  }>;
  userMood: {
    emoji: string;
    text: string;
    score: number;
  };
  userName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contacts, userMood, userName }: MoodAlertRequest = await req.json();

    console.log(`Sending mood alert for ${userName} with mood: ${userMood.text}`);

    // Send email to each trusted contact
    const emailPromises = contacts.map(async (contact) => {
      const emailResponse = await resend.emails.send({
        from: "Patronus Wellness <onboarding@resend.dev>",
        to: [contact.email],
        subject: `Wellness Alert: ${userName} needs support`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Wellness Alert</h2>
            <p>Hello ${contact.name},</p>
            <p>This is an automated wellness alert from the Patronus system.</p>
            
            <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
              <p><strong>${userName}</strong> has logged a low mood and may need support:</p>
              <p style="font-size: 18px; margin: 10px 0;">
                Mood: ${userMood.emoji} ${userMood.text} (${userMood.score}/5)
              </p>
            </div>
            
            <p>As their trusted contact (${contact.relation}), you're receiving this notification to check in on their wellbeing.</p>
            
            <p><strong>What you can do:</strong></p>
            <ul>
              <li>Reach out with a friendly message or call</li>
              <li>Offer to listen without judgment</li>
              <li>Suggest professional support if needed</li>
              <li>Simply let them know you care</li>
            </ul>
            
            <p style="margin-top: 30px;">
              <em>This alert was sent automatically by the Patronus Student Wellness Monitoring System.</em>
            </p>
          </div>
        `,
      });

      return emailResponse;
    });

    const results = await Promise.allSettled(emailPromises);
    
    // Log results
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Email sent successfully to ${contacts[index].email}`);
      } else {
        console.error(`Failed to send email to ${contacts[index].email}:`, result.reason);
      }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Mood alerts sent to ${contacts.length} contacts` 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-mood-alert function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
