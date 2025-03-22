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
      cultural_events: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          event_date: string | null
          id: string
          recurring: boolean | null
          significance: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          recurring?: boolean | null
          significance?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          recurring?: boolean | null
          significance?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cultural_notes: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          note: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          note: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          note?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      families: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      family_access_codes: {
        Row: {
          active: boolean
          created_at: string
          created_by: string | null
          family_id: string
          id: string
          secret_word: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          family_id: string
          id?: string
          secret_word: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          family_id?: string
          id?: string
          secret_word?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_access_codes_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      family_media: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          media_type: string
          member_id: string | null
          metadata: Json | null
          title: string
          updated_at: string | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          media_type: string
          member_id?: string | null
          metadata?: Json | null
          title: string
          updated_at?: string | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          media_type?: string
          member_id?: string | null
          metadata?: Json | null
          title?: string
          updated_at?: string | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      family_members: {
        Row: {
          birth_date: string | null
          birth_place: string | null
          created_at: string | null
          description: string | null
          glyph_type: string
          id: string
          name: string
          occupation: string | null
          parent_id: string | null
          photo_url: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          birth_date?: string | null
          birth_place?: string | null
          created_at?: string | null
          description?: string | null
          glyph_type: string
          id?: string
          name: string
          occupation?: string | null
          parent_id?: string | null
          photo_url?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          birth_date?: string | null
          birth_place?: string | null
          created_at?: string | null
          description?: string | null
          glyph_type?: string
          id?: string
          name?: string
          occupation?: string | null
          parent_id?: string | null
          photo_url?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_members_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "family_members"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members_audit: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          member_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          member_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_members_audit_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "family_members"
            referencedColumns: ["id"]
          },
        ]
      }
      localized_prompts: {
        Row: {
          active: boolean | null
          category_id: string
          created_at: string | null
          cultural_context_en: string | null
          cultural_context_es: string | null
          edition: string
          id: string
          prompt_en: string
          prompt_es: string | null
          relevance_score: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          active?: boolean | null
          category_id: string
          created_at?: string | null
          cultural_context_en?: string | null
          cultural_context_es?: string | null
          edition: string
          id?: string
          prompt_en: string
          prompt_es?: string | null
          relevance_score?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          active?: boolean | null
          category_id?: string
          created_at?: string | null
          cultural_context_en?: string | null
          cultural_context_es?: string | null
          edition?: string
          id?: string
          prompt_en?: string
          prompt_es?: string | null
          relevance_score?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "localized_prompts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "prompt_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          alt_text: string
          category: string
          created_at: string | null
          description: string | null
          file_path: string
          id: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          alt_text: string
          category: string
          created_at?: string | null
          description?: string | null
          file_path: string
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          alt_text?: string
          category?: string
          created_at?: string | null
          description?: string | null
          file_path?: string
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media_items: {
        Row: {
          annotations: Json | null
          category: string | null
          created_at: string | null
          date_taken: string | null
          description: string | null
          file_path: string
          file_size: number
          file_type: string
          geographical_location: string | null
          id: string
          last_modified_at: string | null
          metadata: Json | null
          original_filename: string
          people: string[] | null
          tags: string[] | null
          title: string
          uploader_id: string | null
        }
        Insert: {
          annotations?: Json | null
          category?: string | null
          created_at?: string | null
          date_taken?: string | null
          description?: string | null
          file_path: string
          file_size: number
          file_type: string
          geographical_location?: string | null
          id?: string
          last_modified_at?: string | null
          metadata?: Json | null
          original_filename: string
          people?: string[] | null
          tags?: string[] | null
          title: string
          uploader_id?: string | null
        }
        Update: {
          annotations?: Json | null
          category?: string | null
          created_at?: string | null
          date_taken?: string | null
          description?: string | null
          file_path?: string
          file_size?: number
          file_type?: string
          geographical_location?: string | null
          id?: string
          last_modified_at?: string | null
          metadata?: Json | null
          original_filename?: string
          people?: string[] | null
          tags?: string[] | null
          title?: string
          uploader_id?: string | null
        }
        Relationships: []
      }
      member_interests: {
        Row: {
          created_at: string | null
          id: string
          interest: string
          member_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interest: string
          member_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interest?: string
          member_id?: string | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          caption: string | null
          created_at: string | null
          family_id: string | null
          id: string
          photo_url: string
          taken_at: string | null
          updated_at: string | null
          uploader_id: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          family_id?: string | null
          id?: string
          photo_url: string
          taken_at?: string | null
          updated_at?: string | null
          uploader_id?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          family_id?: string | null
          id?: string
          photo_url?: string
          taken_at?: string | null
          updated_at?: string | null
          uploader_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birthdate: string | null
          created_at: string | null
          data_source: string | null
          email: string | null
          full_name: string
          home_address: string | null
          id: string
          imported_at: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          birthdate?: string | null
          created_at?: string | null
          data_source?: string | null
          email?: string | null
          full_name: string
          home_address?: string | null
          id: string
          imported_at?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          birthdate?: string | null
          created_at?: string | null
          data_source?: string | null
          email?: string | null
          full_name?: string
          home_address?: string | null
          id?: string
          imported_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prompt_categories: {
        Row: {
          active: boolean | null
          created_at: string | null
          description_en: string | null
          description_es: string | null
          icon: string | null
          id: string
          name_en: string
          name_es: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          name_en: string
          name_es?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          name_en?: string
          name_es?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          audio_url: string
          author_id: string | null
          created_at: string | null
          cultural_prompt_id: string | null
          description: string | null
          duration: number | null
          family_id: string | null
          id: string
          is_featured: boolean | null
          story_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url: string
          author_id?: string | null
          created_at?: string | null
          cultural_prompt_id?: string | null
          description?: string | null
          duration?: number | null
          family_id?: string | null
          id?: string
          is_featured?: boolean | null
          story_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string
          author_id?: string | null
          created_at?: string | null
          cultural_prompt_id?: string | null
          description?: string | null
          duration?: number | null
          family_id?: string | null
          id?: string
          is_featured?: boolean | null
          story_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stories_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      story_tags: {
        Row: {
          created_at: string | null
          id: string
          story_id: string | null
          tag: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          story_id?: string | null
          tag: string
        }
        Update: {
          created_at?: string | null
          id?: string
          story_id?: string | null
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_tags_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activities: {
        Row: {
          activity_type: string
          anonymous_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          anonymous_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          anonymous_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_custom_prompts: {
        Row: {
          active: boolean | null
          created_at: string | null
          family_id: string | null
          id: string
          language: string | null
          private: boolean | null
          prompt: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          family_id?: string | null
          id?: string
          language?: string | null
          private?: boolean | null
          prompt: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          family_id?: string | null
          id?: string
          language?: string | null
          private?: boolean | null
          prompt?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_family_context: {
        Row: {
          context_data: Json
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          context_data?: Json
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          context_data?: Json
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_family_secret: {
        Args: {
          _secret_word: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
