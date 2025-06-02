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
      exercises: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string | null
          equipment: string[] | null
          id: string
          image_url: string | null
          instructions: string | null
          muscle_groups: string[] | null
          name: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          equipment?: string[] | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          muscle_groups?: string[] | null
          name: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          equipment?: string[] | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          muscle_groups?: string[] | null
          name?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      user_avatars: {
        Row: {
          avatar_url: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          data_nascimento: string | null
          data_onboarding: string | null
          frequencia_treino: string | null
          id: string
          local_treino: string | null
          nivel_experiencia: string | null
          nome_completo: string | null
          objetivo: string | null
          preferencias_treino: string | null
          restricoes: string | null
          sexo: string | null
          tempo_disponivel: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data_nascimento?: string | null
          data_onboarding?: string | null
          frequencia_treino?: string | null
          id?: string
          local_treino?: string | null
          nivel_experiencia?: string | null
          nome_completo?: string | null
          objetivo?: string | null
          preferencias_treino?: string | null
          restricoes?: string | null
          sexo?: string | null
          tempo_disponivel?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data_nascimento?: string | null
          data_onboarding?: string | null
          frequencia_treino?: string | null
          id?: string
          local_treino?: string | null
          nivel_experiencia?: string | null
          nome_completo?: string | null
          objetivo?: string | null
          preferencias_treino?: string | null
          restricoes?: string | null
          sexo?: string | null
          tempo_disponivel?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_workouts: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          id: string
          name: string
          scheduled_date: string | null
          updated_at: string
          user_id: string
          workout_type: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          name: string
          scheduled_date?: string | null
          updated_at?: string
          user_id: string
          workout_type?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          name?: string
          scheduled_date?: string | null
          updated_at?: string
          user_id?: string
          workout_type?: string | null
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          notes: string | null
          order_position: number
          reps: string | null
          rest_seconds: number | null
          sets: number | null
          weight_kg: number | null
          workout_id: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          id?: string
          notes?: string | null
          order_position: number
          reps?: string | null
          rest_seconds?: number | null
          sets?: number | null
          weight_kg?: number | null
          workout_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          notes?: string | null
          order_position?: number
          reps?: string | null
          rest_seconds?: number | null
          sets?: number | null
          weight_kg?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "user_workouts"
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
