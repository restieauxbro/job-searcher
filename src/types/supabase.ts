export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      amala_articles: {
        Row: {
          batch_id: string
          codename: string
          created_at: string | null
          first_published: string | null
          id: number
          image: Json | null
          preview: string | null
          published: boolean
          slug: string
          tags: string[] | null
          title: string | null
        }
        Insert: {
          batch_id?: string
          codename: string
          created_at?: string | null
          first_published?: string | null
          id?: number
          image?: Json | null
          preview?: string | null
          published?: boolean
          slug: string
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          batch_id?: string
          codename?: string
          created_at?: string | null
          first_published?: string | null
          id?: number
          image?: Json | null
          preview?: string | null
          published?: boolean
          slug?: string
          tags?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      amala_articles_archive: {
        Row: {
          batch_ID: string | null
          content: string | null
          created_at: string | null
          embedding: number[] | null
          slug: string | null
          strapi_ID: number
          tags: string[] | null
          title: string | null
        }
        Insert: {
          batch_ID?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: number[] | null
          slug?: string | null
          strapi_ID: number
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          batch_ID?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: number[] | null
          slug?: string | null
          strapi_ID?: number
          tags?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      amala_comments: {
        Row: {
          article_slug: string
          comment: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          article_slug: string
          comment: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          article_slug?: string
          comment?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amala_comments_article_slug_fkey"
            columns: ["article_slug"]
            isOneToOne: false
            referencedRelation: "amala_articles"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "amala_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "amala_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      amala_profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          roles: string[] | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          roles?: string[] | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          roles?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "amala_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      amala_replies: {
        Row: {
          article_slug: string
          comment_id: string
          created_at: string
          id: string
          reply: string
          user_id: string
        }
        Insert: {
          article_slug: string
          comment_id: string
          created_at?: string
          id?: string
          reply: string
          user_id: string
        }
        Update: {
          article_slug?: string
          comment_id?: string
          created_at?: string
          id?: string
          reply?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amala_replies_article_slug_fkey"
            columns: ["article_slug"]
            isOneToOne: false
            referencedRelation: "amala_articles"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "amala_replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "amala_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amala_replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "amala_comments_with_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amala_replies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "amala_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      cvg_cv: {
        Row: {
          created_at: string
          cv_data: Json | null
          employer: string | null
          id: number
          job_ad_description: string | null
          job_title: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          cv_data?: Json | null
          employer?: string | null
          id?: number
          job_ad_description?: string | null
          job_title?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          cv_data?: Json | null
          employer?: string | null
          id?: number
          job_ad_description?: string | null
          job_title?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      mlr_article_audio: {
        Row: {
          audio_link: string
          created_at: string
          id: number
          slug: string
        }
        Insert: {
          audio_link: string
          created_at?: string
          id?: number
          slug: string
        }
        Update: {
          audio_link?: string
          created_at?: string
          id?: number
          slug?: string
        }
        Relationships: []
      }
      org_members: {
        Row: {
          admin: boolean | null
          email: string | null
          id: number
          org_id: number
          role: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin?: boolean | null
          email?: string | null
          id?: number
          org_id: number
          role?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin?: boolean | null
          email?: string | null
          id?: number
          org_id?: number
          role?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      org_members_invited: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          org_id: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          org_id?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          org_id?: number | null
        }
        Relationships: []
      }
      organisations: {
        Row: {
          created_at: string | null
          id: number
          org_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          org_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          org_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ot_enquiries: {
        Row: {
          client_summary: string | null
          company_name: string | null
          conversation: Json | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          message: string | null
          phone: string | null
        }
        Insert: {
          client_summary?: string | null
          company_name?: string | null
          conversation?: Json | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          message?: string | null
          phone?: string | null
        }
        Update: {
          client_summary?: string | null
          company_name?: string | null
          conversation?: Json | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          message?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_emoji: string | null
          avatar_url: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          metadata: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          metadata?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_emoji?: string | null
          avatar_url?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          metadata?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_waiting: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      amala_comments_with_replies: {
        Row: {
          article_slug: string | null
          comment: string | null
          created_at: string | null
          id: string | null
          reply: string | null
          reply_created_at: string | null
          reply_id: string | null
          reply_user_id: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "amala_comments_article_slug_fkey"
            columns: ["article_slug"]
            isOneToOne: false
            referencedRelation: "amala_articles"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "amala_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "amala_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amala_replies_user_id_fkey"
            columns: ["reply_user_id"]
            isOneToOne: false
            referencedRelation: "amala_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      get_article_comments: {
        Args: {
          slug: string
        }
        Returns: {
          article_slug: string
          comment_id: string
          created_at: string
          id: string
          reply: string
          user_id: string
        }[]
      }
      get_article_comments_replies: {
        Args: {
          slug: string
        }
        Returns: Record<string, unknown>[]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
