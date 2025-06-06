
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserPreferences {
  id?: string;
  screen_time_limit_hours: number;
  sleep_hours_required: number;
  notifications_enabled: boolean;
}

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    screen_time_limit_hours: 8.0,
    sleep_hours_required: 8.0,
    notifications_enabled: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching preferences:', error);
          setError(error.message);
          return;
        }

        if (data) {
          setPreferences({
            id: data.id,
            screen_time_limit_hours: data.screen_time_limit_hours || 8.0,
            sleep_hours_required: data.sleep_hours_required || 8.0,
            notifications_enabled: data.notifications_enabled ?? true
          });
        }
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user) return null;

    try {
      setLoading(true);
      const updatedPrefs = { ...preferences, ...newPreferences };

      if (preferences.id) {
        // Update existing preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .update({
            screen_time_limit_hours: updatedPrefs.screen_time_limit_hours,
            sleep_hours_required: updatedPrefs.sleep_hours_required,
            notifications_enabled: updatedPrefs.notifications_enabled,
            updated_at: new Date().toISOString()
          })
          .eq('id', preferences.id)
          .select()
          .single();

        if (error) throw error;
        setPreferences(updatedPrefs);
        return data;
      } else {
        // Create new preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            screen_time_limit_hours: updatedPrefs.screen_time_limit_hours,
            sleep_hours_required: updatedPrefs.sleep_hours_required,
            notifications_enabled: updatedPrefs.notifications_enabled
          })
          .select()
          .single();

        if (error) throw error;
        setPreferences({ ...updatedPrefs, id: data.id });
        return data;
      }
    } catch (err: any) {
      console.error('Error updating preferences:', err);
      setError(err.message || 'An error occurred while updating preferences');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreferences
  };
};
