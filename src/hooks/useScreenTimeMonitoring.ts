
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ScreenTimeLog {
  id: string;
  date: string;
  hours_used: number;
  last_notification_sent?: string;
}

export const useScreenTimeMonitoring = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [todayScreenTime, setTodayScreenTime] = useState<ScreenTimeLog | null>(null);
  const [screenTimeLogs, setScreenTimeLogs] = useState<ScreenTimeLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchScreenTimeLogs = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Get today's screen time
        const { data: todayData, error: todayError } = await supabase
          .from('screen_time_logs')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today)
          .maybeSingle();

        if (todayError) {
          console.error('Error fetching today screen time:', todayError);
        } else {
          setTodayScreenTime(todayData);
        }

        // Get recent screen time logs
        const { data: logsData, error: logsError } = await supabase
          .from('screen_time_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(7);

        if (logsError) {
          console.error('Error fetching screen time logs:', logsError);
        } else {
          setScreenTimeLogs(logsData || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenTimeLogs();
  }, [user]);

  const logScreenTime = async (hoursUsed: number) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      if (todayScreenTime) {
        // Update existing log
        const { data, error } = await supabase
          .from('screen_time_logs')
          .update({
            hours_used: hoursUsed,
            updated_at: new Date().toISOString()
          })
          .eq('id', todayScreenTime.id)
          .select()
          .single();

        if (error) throw error;
        setTodayScreenTime(data);
      } else {
        // Create new log
        const { data, error } = await supabase
          .from('screen_time_logs')
          .insert({
            user_id: user.id,
            date: today,
            hours_used: hoursUsed
          })
          .select()
          .single();

        if (error) throw error;
        setTodayScreenTime(data);
        setScreenTimeLogs(prev => [data, ...prev.slice(0, 6)]);
      }
    } catch (err: any) {
      console.error('Error logging screen time:', err);
      toast({
        title: "Error",
        description: "Failed to log screen time",
        variant: "destructive"
      });
    }
  };

  const checkAndNotifyScreenTime = async (currentHours: number, limitHours: number) => {
    if (!user || !todayScreenTime) return;

    const threshold = limitHours * 0.8; // Notify at 80% of limit
    const now = new Date();
    const lastNotification = todayScreenTime.last_notification_sent 
      ? new Date(todayScreenTime.last_notification_sent)
      : null;

    // Only notify once per day and if approaching limit
    if (currentHours >= threshold && 
        (!lastNotification || 
         now.getTime() - lastNotification.getTime() > 24 * 60 * 60 * 1000)) {
      
      const { error } = await supabase
        .from('screen_time_logs')
        .update({
          last_notification_sent: now.toISOString()
        })
        .eq('id', todayScreenTime.id);

      if (!error) {
        toast({
          title: "Screen Time Alert",
          description: `You've used ${currentHours.toFixed(1)} hours today. Your daily limit is ${limitHours} hours.`,
          variant: "destructive"
        });
      }
    }
  };

  return {
    todayScreenTime,
    screenTimeLogs,
    loading,
    logScreenTime,
    checkAndNotifyScreenTime
  };
};
