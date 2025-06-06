
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WellnessReport {
  id: string;
  report_type: 'weekly' | 'monthly';
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  mood_average: number;
  total_mood_entries: number;
  total_voice_notes: number;
  sleep_average: number;
  activity_average: number;
  support_alerts_sent: number;
  created_at: string;
}

export const useWellnessReports = () => {
  const [reports, setReports] = useState<WellnessReport[]>([]);
  const [weeklyReports, setWeeklyReports] = useState<WellnessReport[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<WellnessReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('wellness_reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching wellness reports:', error);
          setError(error.message);
          return;
        }

        const typedData = data as WellnessReport[];
        setReports(typedData || []);
        
        // Filter reports by type
        setWeeklyReports(typedData.filter(report => report.report_type === 'weekly') || []);
        setMonthlyReports(typedData.filter(report => report.report_type === 'monthly') || []);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return {
    reports,
    weeklyReports,
    monthlyReports,
    loading,
    error
  };
};
