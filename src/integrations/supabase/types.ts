export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cities: {
        Row: {
          created_at: string | null
          id: string
          is_metro: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          state: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_metro?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          state: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_metro?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          state?: string
        }
        Relationships: []
      }
      employers: {
        Row: {
          average_rating: number | null
          company_name: string | null
          created_at: string | null
          full_name: string
          id: string
          location_city: string | null
          location_pincode: string | null
          location_state: string | null
          phone: string | null
          profile_photo_url: string | null
          total_projects_posted: number | null
          updated_at: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          average_rating?: number | null
          company_name?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          location_city?: string | null
          location_pincode?: string | null
          location_state?: string | null
          phone?: string | null
          profile_photo_url?: string | null
          total_projects_posted?: number | null
          updated_at?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          average_rating?: number | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          location_city?: string | null
          location_pincode?: string | null
          location_state?: string | null
          phone?: string | null
          profile_photo_url?: string | null
          total_projects_posted?: number | null
          updated_at?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      trust_circles: {
        Row: {
          admin_worker_id: string | null
          created_at: string | null
          description: string | null
          id: string
          location_city: string | null
          location_state: string | null
          member_count: number | null
          minimum_rating: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          admin_worker_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_city?: string | null
          location_state?: string | null
          member_count?: number | null
          minimum_rating?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          admin_worker_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_city?: string | null
          location_state?: string | null
          member_count?: number | null
          minimum_rating?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trust_circles_admin_worker_id_fkey"
            columns: ["admin_worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          created_at: string | null
          document_type: string
          document_url: string
          id: string
          rejection_reason: string | null
          updated_at: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          worker_id: string
        }
        Insert: {
          created_at?: string | null
          document_type: string
          document_url: string
          id?: string
          rejection_reason?: string | null
          updated_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          worker_id: string
        }
        Update: {
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          rejection_reason?: string | null
          updated_at?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_skills: {
        Row: {
          created_at: string | null
          id: string
          proficiency_level: string | null
          skill_id: string
          worker_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          proficiency_level?: string | null
          skill_id: string
          worker_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          proficiency_level?: string | null
          skill_id?: string
          worker_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_skills_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_trust_circles: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          id: string
          joined_at: string | null
          status: string | null
          trust_circle_id: string
          worker_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          id?: string
          joined_at?: string | null
          status?: string | null
          trust_circle_id: string
          worker_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          id?: string
          joined_at?: string | null
          status?: string | null
          trust_circle_id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_trust_circles_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_trust_circles_trust_circle_id_fkey"
            columns: ["trust_circle_id"]
            isOneToOne: false
            referencedRelation: "trust_circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_trust_circles_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          availability_status: string | null
          average_rating: number | null
          bio: string | null
          city_id: string | null
          created_at: string | null
          daily_rate: number | null
          date_of_birth: string | null
          earnings_score: number | null
          full_name: string
          hourly_rate: number | null
          id: string
          latitude: number | null
          location_city: string | null
          location_pincode: string | null
          location_state: string | null
          longitude: number | null
          monthly_rate: number | null
          phone: string | null
          preferred_payment_mode: string | null
          profile_photo_url: string | null
          subscription_expiry: string | null
          subscription_tier: string | null
          total_jobs_completed: number | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
          verified: boolean | null
          years_of_experience: number | null
        }
        Insert: {
          availability_status?: string | null
          average_rating?: number | null
          bio?: string | null
          city_id?: string | null
          created_at?: string | null
          daily_rate?: number | null
          date_of_birth?: string | null
          earnings_score?: number | null
          full_name: string
          hourly_rate?: number | null
          id?: string
          latitude?: number | null
          location_city?: string | null
          location_pincode?: string | null
          location_state?: string | null
          longitude?: number | null
          monthly_rate?: number | null
          phone?: string | null
          preferred_payment_mode?: string | null
          profile_photo_url?: string | null
          subscription_expiry?: string | null
          subscription_tier?: string | null
          total_jobs_completed?: number | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          verified?: boolean | null
          years_of_experience?: number | null
        }
        Update: {
          availability_status?: string | null
          average_rating?: number | null
          bio?: string | null
          city_id?: string | null
          created_at?: string | null
          daily_rate?: number | null
          date_of_birth?: string | null
          earnings_score?: number | null
          full_name?: string
          hourly_rate?: number | null
          id?: string
          latitude?: number | null
          location_city?: string | null
          location_pincode?: string | null
          location_state?: string | null
          longitude?: number | null
          monthly_rate?: number | null
          phone?: string | null
          preferred_payment_mode?: string | null
          profile_photo_url?: string | null
          subscription_expiry?: string | null
          subscription_tier?: string | null
          total_jobs_completed?: number | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          verified?: boolean | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workers_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
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
      user_type: "worker" | "employer" | "both"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_type: ["worker", "employer", "both"],
    },
  },
} as const
