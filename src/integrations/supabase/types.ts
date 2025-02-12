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
      about_content: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
        }
        Relationships: []
      }
      bbs_posts: {
        Row: {
          author: string | null
          content: string
          created_at: string | null
          edit_count: number | null
          formatting_flags: Json | null
          id: string
          is_edited: boolean | null
          last_edited_at: string | null
          signature: string | null
          tags: string[] | null
          thread_id: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string | null
          edit_count?: number | null
          formatting_flags?: Json | null
          id?: string
          is_edited?: boolean | null
          last_edited_at?: string | null
          signature?: string | null
          tags?: string[] | null
          thread_id?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string | null
          edit_count?: number | null
          formatting_flags?: Json | null
          id?: string
          is_edited?: boolean | null
          last_edited_at?: string | null
          signature?: string | null
          tags?: string[] | null
          thread_id?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bbs_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "bbs_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      bbs_threads: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          last_active_at: string | null
          status: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_active_at?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_active_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      bbs_user_profiles: {
        Row: {
          avatar_ascii: string | null
          handle: string
          id: string
          joined_at: string | null
          last_seen_at: string | null
          posts_count: number | null
          signature: string | null
          theme_preference: Json | null
          title: string | null
          user_id: string
        }
        Insert: {
          avatar_ascii?: string | null
          handle: string
          id?: string
          joined_at?: string | null
          last_seen_at?: string | null
          posts_count?: number | null
          signature?: string | null
          theme_preference?: Json | null
          title?: string | null
          user_id: string
        }
        Update: {
          avatar_ascii?: string | null
          handle?: string
          id?: string
          joined_at?: string | null
          last_seen_at?: string | null
          posts_count?: number | null
          signature?: string | null
          theme_preference?: Json | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          metadata: Json | null
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_settings: {
        Row: {
          author: string | null
          created_at: string
          description: string | null
          id: string
          social_links: Json | null
          theme_settings: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: string
          social_links?: Json | null
          theme_settings?: Json | null
          title?: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: string
          social_links?: Json | null
          theme_settings?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_artifacts: {
        Row: {
          created_at: string
          description: string | null
          faction_id: string | null
          id: string
          location: string | null
          metadata: Json | null
          name: string
          origin: string | null
          power_level: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          faction_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json | null
          name: string
          origin?: string | null
          power_level?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          faction_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json | null
          name?: string
          origin?: string | null
          power_level?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_artifacts_faction_id_fkey"
            columns: ["faction_id"]
            isOneToOne: false
            referencedRelation: "content_factions"
            referencedColumns: ["id"]
          },
        ]
      }
      content_crossovers: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          relationship_type: string
          source_id: string
          source_type: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          relationship_type: string
          source_id: string
          source_type: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          relationship_type?: string
          source_id?: string
          source_type?: string
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      content_entity_relationships: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          entity_id: string
          relationship_type: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          entity_id: string
          relationship_type: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          entity_id?: string
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_entity_relationships_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "story_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      content_factions: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          metadata: Json | null
          name: string
          status: string | null
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          name: string
          status?: string | null
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          status?: string | null
          type?: string
        }
        Relationships: []
      }
      discoveries: {
        Row: {
          discovered_at: string
          discovery_type: string
          id: string
          user_id: string
        }
        Insert: {
          discovered_at?: string
          discovery_type: string
          id?: string
          user_id: string
        }
        Update: {
          discovered_at?: string
          discovery_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      dispatch_messages: {
        Row: {
          content: string
          created_at: string | null
          display_mode: string | null
          formatting_flags: Json | null
          id: string
          sender: string | null
          status: string | null
          thread_id: string | null
          timestamp: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          display_mode?: string | null
          formatting_flags?: Json | null
          id?: string
          sender?: string | null
          status?: string | null
          thread_id?: string | null
          timestamp?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          display_mode?: string | null
          formatting_flags?: Json | null
          id?: string
          sender?: string | null
          status?: string | null
          thread_id?: string | null
          timestamp?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_thread"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "dispatch_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      dispatch_threads: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
          subscribed: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
          subscribed?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
          subscribed?: boolean | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          activity: string | null
          coordinates: string
          created_at: string | null
          id: string
          lat: number
          lng: number
          name: string
          status: string
          threat: string
          type: string
        }
        Insert: {
          activity?: string | null
          coordinates: string
          created_at?: string | null
          id?: string
          lat: number
          lng: number
          name: string
          status: string
          threat: string
          type: string
        }
        Update: {
          activity?: string | null
          coordinates?: string
          created_at?: string | null
          id?: string
          lat?: number
          lng?: number
          name?: string
          status?: string
          threat?: string
          type?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          subscribed: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          subscribed?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          subscribed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      poem_styles: {
        Row: {
          animation_config: Json | null
          color_scheme: Json
          created_at: string
          description: string | null
          font_family: string
          id: number
          name: string
        }
        Insert: {
          animation_config?: Json | null
          color_scheme: Json
          created_at?: string
          description?: string | null
          font_family: string
          id?: number
          name: string
        }
        Update: {
          animation_config?: Json | null
          color_scheme?: Json
          created_at?: string
          description?: string | null
          font_family?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      poems: {
        Row: {
          audio_url: string | null
          author: string
          author_id: string | null
          content: string
          created_at: string
          formatting: Json | null
          id: string
          image_url: string | null
          layout_config: Json | null
          layout_type: string | null
          likes_count: number | null
          media_config: Json | null
          style: Json | null
          style_config: Json | null
          title: string
          visibility: string | null
        }
        Insert: {
          audio_url?: string | null
          author: string
          author_id?: string | null
          content: string
          created_at?: string
          formatting?: Json | null
          id?: string
          image_url?: string | null
          layout_config?: Json | null
          layout_type?: string | null
          likes_count?: number | null
          media_config?: Json | null
          style?: Json | null
          style_config?: Json | null
          title: string
          visibility?: string | null
        }
        Update: {
          audio_url?: string | null
          author?: string
          author_id?: string | null
          content?: string
          created_at?: string
          formatting?: Json | null
          id?: string
          image_url?: string | null
          layout_config?: Json | null
          layout_type?: string | null
          likes_count?: number | null
          media_config?: Json | null
          style?: Json | null
          style_config?: Json | null
          title?: string
          visibility?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          preferred_language: string | null
          role: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          preferred_language?: string | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferred_language?: string | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      responses: {
        Row: {
          content: string
          created_at: string
          id: string
          poem_id: string
          response_type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          poem_id: string
          response_type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          poem_id?: string
          response_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string | null
          id: string
          name: string
          settings: Json | null
          type: Database["public"]["Enums"]["section_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          settings?: Json | null
          type: Database["public"]["Enums"]["section_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          settings?: Json | null
          type?: Database["public"]["Enums"]["section_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      story_artifacts: {
        Row: {
          created_at: string
          current_location: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          origin: string | null
          powers: string[] | null
          type: string
        }
        Insert: {
          created_at?: string
          current_location?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          origin?: string | null
          powers?: string[] | null
          type: string
        }
        Update: {
          created_at?: string
          current_location?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          origin?: string | null
          powers?: string[] | null
          type?: string
        }
        Relationships: []
      }
      story_branches: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          requirements: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          requirements?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          requirements?: Json | null
        }
        Relationships: []
      }
      story_characters: {
        Row: {
          affiliations: string[] | null
          background: string | null
          created_at: string
          first_appearance: string | null
          id: string
          metadata: Json | null
          name: string
          role: string
        }
        Insert: {
          affiliations?: string[] | null
          background?: string | null
          created_at?: string
          first_appearance?: string | null
          id?: string
          metadata?: Json | null
          name: string
          role: string
        }
        Update: {
          affiliations?: string[] | null
          background?: string | null
          created_at?: string
          first_appearance?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          role?: string
        }
        Relationships: []
      }
      story_choices: {
        Row: {
          choice_text: string
          created_at: string
          id: string
          source_node_id: string
          target_node_id: string
        }
        Insert: {
          choice_text: string
          created_at?: string
          id?: string
          source_node_id: string
          target_node_id: string
        }
        Update: {
          choice_text?: string
          created_at?: string
          id?: string
          source_node_id?: string
          target_node_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_source_node"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_target_node"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_choices_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_choices_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      story_entities: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      story_events: {
        Row: {
          affected_users: string[] | null
          content: Json
          created_at: string | null
          event_type: string
          id: string
          processed: boolean | null
          trigger_id: string
          trigger_type: string
        }
        Insert: {
          affected_users?: string[] | null
          content: Json
          created_at?: string | null
          event_type: string
          id?: string
          processed?: boolean | null
          trigger_id: string
          trigger_type: string
        }
        Update: {
          affected_users?: string[] | null
          content?: Json
          created_at?: string | null
          event_type?: string
          id?: string
          processed?: boolean | null
          trigger_id?: string
          trigger_type?: string
        }
        Relationships: []
      }
      story_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          item_type: string
          name: string
          properties: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          item_type: string
          name: string
          properties?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          item_type?: string
          name?: string
          properties?: Json | null
        }
        Relationships: []
      }
      story_locations: {
        Row: {
          coordinates: unknown | null
          created_at: string
          description: string | null
          first_appearance: string | null
          id: string
          metadata: Json | null
          name: string
          significance: string | null
        }
        Insert: {
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          first_appearance?: string | null
          id?: string
          metadata?: Json | null
          name: string
          significance?: string | null
        }
        Update: {
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          first_appearance?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          significance?: string | null
        }
        Relationships: []
      }
      story_map_discoveries: {
        Row: {
          discovered_at: string
          id: string
          region_id: string
          user_id: string
        }
        Insert: {
          discovered_at?: string
          id?: string
          region_id: string
          user_id: string
        }
        Update: {
          discovered_at?: string
          id?: string
          region_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_map_discoveries_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "story_map_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      story_map_regions: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          parent_region_id: string | null
          region_coordinates: Json
          unlock_conditions: Json | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_region_id?: string | null
          region_coordinates?: Json
          unlock_conditions?: Json | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_region_id?: string | null
          region_coordinates?: Json
          unlock_conditions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "story_map_regions_parent_region_id_fkey"
            columns: ["parent_region_id"]
            isOneToOne: false
            referencedRelation: "story_map_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      story_node_branches: {
        Row: {
          branch_id: string
          branch_order: number | null
          conditions: Json | null
          created_at: string
          id: string
          node_id: string
        }
        Insert: {
          branch_id: string
          branch_order?: number | null
          conditions?: Json | null
          created_at?: string
          id?: string
          node_id: string
        }
        Update: {
          branch_id?: string
          branch_order?: number | null
          conditions?: Json | null
          created_at?: string
          id?: string
          node_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_branch"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "story_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_node"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_node_branches_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "story_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_node_branches_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      story_node_discoveries: {
        Row: {
          discovered_at: string
          id: string
          node_id: string
          triggered_content: Json | null
          user_id: string
        }
        Insert: {
          discovered_at?: string
          id?: string
          node_id: string
          triggered_content?: Json | null
          user_id: string
        }
        Update: {
          discovered_at?: string
          id?: string
          node_id?: string
          triggered_content?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_node_discoveries_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      story_nodes: {
        Row: {
          background_image_url: string | null
          background_music_url: string | null
          content: string
          created_at: string
          custom_styles: Json | null
          discovery_triggers: Json | null
          effects: Json | null
          id: string
          map_connections: Json | null
          map_region: string | null
          map_visibility_rules: Json | null
          map_x: number | null
          map_y: number | null
          metadata: Json | null
          node_template: string | null
          node_type: string
          prerequisites: Json | null
          required_items: string[] | null
          title: string
          visibility_conditions: Json | null
        }
        Insert: {
          background_image_url?: string | null
          background_music_url?: string | null
          content: string
          created_at?: string
          custom_styles?: Json | null
          discovery_triggers?: Json | null
          effects?: Json | null
          id?: string
          map_connections?: Json | null
          map_region?: string | null
          map_visibility_rules?: Json | null
          map_x?: number | null
          map_y?: number | null
          metadata?: Json | null
          node_template?: string | null
          node_type: string
          prerequisites?: Json | null
          required_items?: string[] | null
          title: string
          visibility_conditions?: Json | null
        }
        Update: {
          background_image_url?: string | null
          background_music_url?: string | null
          content?: string
          created_at?: string
          custom_styles?: Json | null
          discovery_triggers?: Json | null
          effects?: Json | null
          id?: string
          map_connections?: Json | null
          map_region?: string | null
          map_visibility_rules?: Json | null
          map_x?: number | null
          map_y?: number | null
          metadata?: Json | null
          node_template?: string | null
          node_type?: string
          prerequisites?: Json | null
          required_items?: string[] | null
          title?: string
          visibility_conditions?: Json | null
        }
        Relationships: []
      }
      story_npc_messages: {
        Row: {
          content: string
          context: Json | null
          created_at: string | null
          discovery_trigger_id: string | null
          effects: Json | null
          id: string
          npc_id: string
          response_to: string | null
          visibility_conditions: Json | null
        }
        Insert: {
          content: string
          context?: Json | null
          created_at?: string | null
          discovery_trigger_id?: string | null
          effects?: Json | null
          id?: string
          npc_id: string
          response_to?: string | null
          visibility_conditions?: Json | null
        }
        Update: {
          content?: string
          context?: Json | null
          created_at?: string | null
          discovery_trigger_id?: string | null
          effects?: Json | null
          id?: string
          npc_id?: string
          response_to?: string | null
          visibility_conditions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "story_npc_messages_discovery_trigger_id_fkey"
            columns: ["discovery_trigger_id"]
            isOneToOne: false
            referencedRelation: "story_node_discoveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_npc_messages_response_to_fkey"
            columns: ["response_to"]
            isOneToOne: false
            referencedRelation: "story_npc_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      story_organizations: {
        Row: {
          created_at: string
          description: string | null
          founding_date: string | null
          id: string
          metadata: Json | null
          name: string
          status: string | null
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          founding_date?: string | null
          id?: string
          metadata?: Json | null
          name: string
          status?: string | null
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          founding_date?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          status?: string | null
          type?: string
        }
        Relationships: []
      }
      story_tags: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      story_timelines: {
        Row: {
          created_at: string
          description: string | null
          era: string
          id: string
          metadata: Json | null
          title: string
          year_range: unknown | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          era: string
          id?: string
          metadata?: Json | null
          title: string
          year_range?: unknown | null
        }
        Update: {
          created_at?: string
          description?: string | null
          era?: string
          id?: string
          metadata?: Json | null
          title?: string
          year_range?: unknown | null
        }
        Relationships: []
      }
      terminal_achievements: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_secret: boolean | null
          metadata: Json | null
          points: number | null
          requirements: Json | null
          title: string
          type: Database["public"]["Enums"]["achievement_type"]
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_secret?: boolean | null
          metadata?: Json | null
          points?: number | null
          requirements?: Json | null
          title: string
          type: Database["public"]["Enums"]["achievement_type"]
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_secret?: boolean | null
          metadata?: Json | null
          points?: number | null
          requirements?: Json | null
          title?: string
          type?: Database["public"]["Enums"]["achievement_type"]
        }
        Relationships: []
      }
      terminal_discoveries: {
        Row: {
          created_at: string | null
          description: string | null
          discovery_type: Database["public"]["Enums"]["discovery_type"]
          id: string
          is_secret: boolean | null
          requirements: Json | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discovery_type: Database["public"]["Enums"]["discovery_type"]
          id?: string
          is_secret?: boolean | null
          requirements?: Json | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discovery_type?: Database["public"]["Enums"]["discovery_type"]
          id?: string
          is_secret?: boolean | null
          requirements?: Json | null
          title?: string
        }
        Relationships: []
      }
      terminal_sessions: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          last_command: string | null
          session_data: Json | null
          theme: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          last_command?: string | null
          session_data?: Json | null
          theme?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          last_command?: string | null
          session_data?: Json | null
          theme?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      transmissions: {
        Row: {
          content: string
          created_at: string
          cryptic_clues: Json | null
          id: string
          is_featured: boolean | null
          metadata: Json | null
          published_at: string | null
          required_level: number | null
          required_path: Database["public"]["Enums"]["user_path_type"] | null
          status: string | null
          theme: Database["public"]["Enums"]["content_theme_type"]
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          cryptic_clues?: Json | null
          id?: string
          is_featured?: boolean | null
          metadata?: Json | null
          published_at?: string | null
          required_level?: number | null
          required_path?: Database["public"]["Enums"]["user_path_type"] | null
          status?: string | null
          theme: Database["public"]["Enums"]["content_theme_type"]
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          cryptic_clues?: Json | null
          id?: string
          is_featured?: boolean | null
          metadata?: Json | null
          published_at?: string | null
          required_level?: number | null
          required_path?: Database["public"]["Enums"]["user_path_type"] | null
          status?: string | null
          theme?: Database["public"]["Enums"]["content_theme_type"]
          title?: string
        }
        Relationships: []
      }
      ui_preferences: {
        Row: {
          blog_style: string | null
          created_at: string
          id: string
          section_preferences: Json | null
          ui_mode: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          blog_style?: string | null
          created_at?: string
          id?: string
          section_preferences?: Json | null
          ui_mode?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          blog_style?: string | null
          created_at?: string
          id?: string
          section_preferences?: Json | null
          ui_mode?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      unified_posts: {
        Row: {
          author_id: string | null
          content: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          metadata: Json | null
          published_at: string | null
          section_id: string | null
          slug: string
          status: string
          theme_specific_styles: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          section_id?: string | null
          slug: string
          status?: string
          theme_specific_styles?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          section_id?: string | null
          slug?: string
          status?: string
          theme_specific_styles?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unified_posts_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      user_glyphs: {
        Row: {
          created_at: string
          glyph_pattern: string
          id: string
          last_active: string | null
          preferences: Json | null
        }
        Insert: {
          created_at?: string
          glyph_pattern?: string
          id: string
          last_active?: string | null
          preferences?: Json | null
        }
        Update: {
          created_at?: string
          glyph_pattern?: string
          id?: string
          last_active?: string | null
          preferences?: Json | null
        }
        Relationships: []
      }
      user_inventory: {
        Row: {
          acquired_at: string
          id: string
          item_id: string
          metadata: Json | null
          quantity: number | null
          user_id: string
        }
        Insert: {
          acquired_at?: string
          id?: string
          item_id: string
          metadata?: Json | null
          quantity?: number | null
          user_id: string
        }
        Update: {
          acquired_at?: string
          id?: string
          item_id?: string
          metadata?: Json | null
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "story_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "story_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_paths: {
        Row: {
          achievements: Json | null
          created_at: string
          experience_points: number | null
          id: string
          level: number | null
          primary_path: Database["public"]["Enums"]["user_path_type"]
          secondary_path: Database["public"]["Enums"]["user_path_type"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          created_at?: string
          experience_points?: number | null
          id?: string
          level?: number | null
          primary_path: Database["public"]["Enums"]["user_path_type"]
          secondary_path?: Database["public"]["Enums"]["user_path_type"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          created_at?: string
          experience_points?: number | null
          id?: string
          level?: number | null
          primary_path?: Database["public"]["Enums"]["user_path_type"]
          secondary_path?: Database["public"]["Enums"]["user_path_type"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_story_progress: {
        Row: {
          achievements: Json | null
          active_branches: string[] | null
          created_at: string
          current_node_id: string
          id: string
          path_taken: string[] | null
          story_state: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          active_branches?: string[] | null
          created_at?: string
          current_node_id: string
          id?: string
          path_taken?: string[] | null
          story_state?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          active_branches?: string[] | null
          created_at?: string
          current_node_id?: string
          id?: string
          path_taken?: string[] | null
          story_state?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_story_progress_current_node_id_fkey"
            columns: ["current_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_terminal_achievements: {
        Row: {
          achievement_id: string | null
          id: string
          metadata: Json | null
          unlocked_at: string | null
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          id?: string
          metadata?: Json | null
          unlocked_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          id?: string
          metadata?: Json | null
          unlocked_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_terminal_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "terminal_achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_terminal_discoveries: {
        Row: {
          discovered_at: string | null
          discovery_id: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          discovered_at?: string | null
          discovery_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          discovered_at?: string | null
          discovery_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_terminal_discoveries_discovery_id_fkey"
            columns: ["discovery_id"]
            isOneToOne: false
            referencedRelation: "terminal_discoveries"
            referencedColumns: ["id"]
          },
        ]
      }
      zine_comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zine_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "zine_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      zine_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      achievement_type: "discovery" | "interaction" | "community" | "special"
      admin_role: "admin" | "editor" | "moderator"
      content_theme_type: "philosophy" | "technology" | "documentation"
      content_type: "blog" | "zine"
      discovery_type: "command" | "easter_egg" | "achievement" | "milestone"
      poem_author: "original" | "wandering_sage" | "cipher_monk"
      section_type: "dispatch" | "dharma" | "bbs"
      user_path_type: "seeker" | "builder" | "observer"
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
