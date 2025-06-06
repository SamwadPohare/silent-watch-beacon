
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SleepQuality {
  id: string;
  date: string;
  sleep_score: number;
  duration_hours: number;
  bedtime: string;
  wake_time: string;
  quality: string;
  deep_sleep_hours: number;
  rem_sleep_hours: number;
  interruptions: number;
}

export const useSleepQuality = () => {
  const [sleepHistory, setSleepHistory] = useState<SleepQuality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSleepQuality = async () => {
      try {
        const { data, error } = await supabase
          .from('sleep_quality')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching sleep quality:', error);
          setError(error.message);
          return;
        }

        setSleepHistory(data || []);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSleepQuality();
  }, []);

  // Calculate current score (most recent entry)
  const currentScore = sleepHistory.length > 0 ? sleepHistory[0].sleep_score : 68;
  
  // Calculate average duration
  const averageDuration = sleepHistory.length > 0
    ? sleepHistory.reduce((sum, item) => sum + item.duration_hours, 0) / sleepHistory.length
    : 7.1;

  // Format average duration as hours and minutes
  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  // Calculate sleep efficiency (simplified calculation)
  const sleepEfficiency = sleepHistory.length > 0
    ? Math.round(sleepHistory.reduce((sum, item) => sum + item.sleep_score, 0) / sleepHistory.length * 0.85)
    : 71;

  return {
    sleepHistory,
    currentScore,
    averageDuration: formatDuration(averageDuration),
    sleepEfficiency,
    loading,
    error
  };
};
