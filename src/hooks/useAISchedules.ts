
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AISchedule {
  id: string;
  schedule_date: string;
  schedule_data: {
    wake_time: string;
    sleep_time: string;
    study_blocks: Array<{
      start_time: string;
      end_time: string;
      subject: string;
      type: string;
    }>;
    break_times: Array<{
      start_time: string;
      end_time: string;
      activity: string;
    }>;
    screen_time_budget: number;
    wellness_activities: Array<{
      time: string;
      activity: string;
      duration: number;
    }>;
  };
}

export const useAISchedules = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<AISchedule[]>([]);
  const [todaySchedule, setTodaySchedule] = useState<AISchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSchedules = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Get today's schedule
        const { data: todayData, error: todayError } = await supabase
          .from('ai_schedules')
          .select('*')
          .eq('user_id', user.id)
          .eq('schedule_date', today)
          .maybeSingle();

        if (todayError) {
          console.error('Error fetching today schedule:', todayError);
        } else {
          setTodaySchedule(todayData);
        }

        // Get recent schedules
        const { data: schedulesData, error: schedulesError } = await supabase
          .from('ai_schedules')
          .select('*')
          .eq('user_id', user.id)
          .order('schedule_date', { ascending: false })
          .limit(7);

        if (schedulesError) {
          console.error('Error fetching schedules:', schedulesError);
          setError(schedulesError.message);
        } else {
          setSchedules(schedulesData || []);
        }
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [user]);

  const generateAISchedule = async (preferences: { screen_time_limit_hours: number; sleep_hours_required: number }) => {
    if (!user) return null;

    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      
      // Generate a sample AI schedule based on preferences
      const sleepHours = preferences.sleep_hours_required;
      const wakeTime = "07:00";
      const sleepTime = new Date();
      sleepTime.setHours(23 - sleepHours + 7); // Calculate bedtime
      
      const scheduleData = {
        wake_time: wakeTime,
        sleep_time: sleepTime.toTimeString().slice(0, 5),
        study_blocks: [
          { start_time: "09:00", end_time: "11:00", subject: "Mathematics", type: "focus_session" },
          { start_time: "14:00", end_time: "16:00", subject: "Science", type: "review_session" },
          { start_time: "19:00", end_time: "20:30", subject: "Reading", type: "light_study" }
        ],
        break_times: [
          { start_time: "11:00", end_time: "11:15", activity: "Stretch & Hydrate" },
          { start_time: "16:00", end_time: "16:30", activity: "Physical Activity" },
          { start_time: "20:30", end_time: "21:00", activity: "Meditation" }
        ],
        screen_time_budget: preferences.screen_time_limit_hours,
        wellness_activities: [
          { time: "07:30", activity: "Morning Meditation", duration: 15 },
          { time: "12:00", activity: "Mindful Lunch", duration: 30 },
          { time: "18:00", activity: "Evening Walk", duration: 30 }
        ]
      };

      const { data, error } = await supabase
        .from('ai_schedules')
        .upsert({
          user_id: user.id,
          schedule_date: today,
          schedule_data: scheduleData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setTodaySchedule(data);
      setSchedules(prev => [data, ...prev.filter(s => s.schedule_date !== today)]);
      return data;
    } catch (err: any) {
      console.error('Error generating AI schedule:', err);
      setError(err.message || 'An error occurred while generating schedule');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    schedules,
    todaySchedule,
    loading,
    error,
    generateAISchedule
  };
};
