export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean
          mood_alert_enabled: boolean | null
          name: string
          phone: string | null
          relation: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean
          mood_alert_enabled?: boolean | null
          name: string
          phone?: string | null
          relation: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean
          mood_alert_enabled?: boolean | null
          name?: string
          phone?: string | null
          relation?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      counselor_bookings: {
        Row: {
          address: string
          age: number
          contact_number: string
          counselor_id: string
          created_at: string
          email_address: string
          full_name: string
          gender: string
          id: string
          occupation: string
          preferred_date: string | null
          preferred_time: string | null
          reason_for_booking: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          age: number
          contact_number: string
          counselor_id: string
          created_at?: string
          email_address: string
          full_name: string
          gender: string
          id?: string
          occupation: string
          preferred_date?: string | null
          preferred_time?: string | null
          reason_for_booking?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          age?: number
          contact_number?: string
          counselor_id?: string
          created_at?: string
          email_address?: string
          full_name?: string
          gender?: string
          id?: string
          occupation?: string
          preferred_date?: string | null
          preferred_time?: string | null
          reason_for_booking?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "counselor_bookings_counselor_id_fkey"
            columns: ["counselor_id"]
            isOneToOne: false
            referencedRelation: "counselors"
            referencedColumns: ["id"]
          },
        ]
      }
      counselors: {
        Row: {
          available_hours: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          available_hours?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          available_hours?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      leave_applications: {
        Row: {
          additional_notes: string | null
          contact_id: string | null
          created_at: string | null
          end_date: string
          id: string
          is_medical_leave: boolean | null
          medical_certificate_url: string | null
          reason: string
          start_date: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          contact_id?: string | null
          created_at?: string | null
          end_date: string
          id?: string
          is_medical_leave?: boolean | null
          medical_certificate_url?: string | null
          reason: string
          start_date: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          contact_id?: string | null
          created_at?: string | null
          end_date?: string
          id?: string
          is_medical_leave?: boolean | null
          medical_certificate_url?: string | null
          reason?: string
          start_date?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_applications_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_logs: {
        Row: {
          created_at: string | null
          id: string
          mood_emoji: string
          mood_score: number | null
          mood_text: string | null
          notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mood_emoji: string
          mood_score?: number | null
          mood_text?: string | null
          notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mood_emoji?: string
          mood_score?: number | null
          mood_text?: string | null
          notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      voice_logs: {
        Row: {
          analyzed_mood: string | null
          audio_url: string
          created_at: string | null
          duration_seconds: number | null
          id: string
          mood_log_id: string | null
          transcription: string | null
          user_id: string
        }
        Insert: {
          analyzed_mood?: string | null
          audio_url: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          mood_log_id?: string | null
          transcription?: string | null
          user_id: string
        }
        Update: {
          analyzed_mood?: string | null
          audio_url?: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          mood_log_id?: string | null
          transcription?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_logs_mood_log_id_fkey"
            columns: ["mood_log_id"]
            isOneToOne: false
            referencedRelation: "mood_logs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
