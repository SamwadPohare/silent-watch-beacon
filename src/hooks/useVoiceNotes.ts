
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface VoiceNote {
  id: string;
  audio_url: string;
  transcription?: string;
  duration_seconds?: number;
  analyzed_mood?: string;
  created_at: string;
}

export const useVoiceNotes = () => {
  const { user } = useAuth();
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchVoiceNotes = async () => {
      try {
        const { data, error } = await supabase
          .from('voice_notes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching voice notes:', error);
          setError(error.message);
          return;
        }

        setVoiceNotes(data || []);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVoiceNotes();
  }, [user]);

  const saveVoiceNote = async (audioBlob: Blob, transcription?: string, analyzedMood?: string) => {
    if (!user) return null;

    try {
      setLoading(true);
      
      // Upload the audio file to storage
      const fileName = `${user.id}/${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('voice-notes')
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('voice-notes')
        .getPublicUrl(fileName);

      // Create a new voice note record
      const { data: voiceNote, error: noteError } = await supabase
        .from('voice_notes')
        .insert({
          user_id: user.id,
          audio_url: publicUrlData.publicUrl,
          transcription,
          analyzed_mood: analyzedMood,
          duration_seconds: Math.round(audioBlob.size / 16000) // Rough estimate, 16kb per second
        })
        .select()
        .single();

      if (noteError) throw noteError;

      // Update the local state
      setVoiceNotes(prev => [voiceNote, ...prev]);
      return voiceNote;
    } catch (err: any) {
      console.error('Error saving voice note:', err);
      setError(err.message || 'An error occurred while saving the voice note');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    voiceNotes,
    loading,
    error,
    saveVoiceNote
  };
};
