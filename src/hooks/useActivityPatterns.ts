
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ActivityPattern {
  id: string;
  date: string;
  activity_level: number;
  duration_hours: number;
  activity_type: string;
  status: string;
  details: string;
  steps: number;
}

export const useActivityPatterns = () => {
  const [activityHistory, setActivityHistory] = useState<ActivityPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivityPatterns = async () => {
      try {
        const { data, error } = await supabase
          .from('activity_patterns')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching activity patterns:', error);
          setError(error.message);
          return;
        }

        setActivityHistory(data || []);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchActivityPatterns();
  }, []);

  // Calculate current score (most recent entry)
  const currentScore = activityHistory.length > 0 ? activityHistory[0].activity_level : 85;
  
  // Calculate weekly average
  const weeklyAverage = activityHistory.length > 0 
    ? Math.round(activityHistory.reduce((sum, item) => sum + item.activity_level, 0) / activityHistory.length)
    : 82;

  // Calculate average daily steps
  const averageSteps = activityHistory.length > 0
    ? Math.round(activityHistory.reduce((sum, item) => sum + (item.steps || 0), 0) / activityHistory.length)
    : 7250;

  return {
    activityHistory,
    currentScore,
    weeklyAverage,
    averageSteps,
    loading,
    error
  };
};
