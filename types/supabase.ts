export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          keywords: Json | null
          link: string | null
          section: number
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          keywords?: Json | null
          link?: string | null
          section: number
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          keywords?: Json | null
          link?: string | null
          section?: number
          title?: string | null
          user_id?: string
        }
      }
      portfolios: {
        Row: {
          background_color: string | null
          button_color: string | null
          button_color_hover: string | null
          card_color: string | null
          card_color_hover: string | null
          created_at: string | null
          id: number
          text_major_color: string | null
          text_minor_2_color: string | null
          text_minor_color: string | null
          user_id: string
        }
        Insert: {
          background_color?: string | null
          button_color?: string | null
          button_color_hover?: string | null
          card_color?: string | null
          card_color_hover?: string | null
          created_at?: string | null
          id?: number
          text_major_color?: string | null
          text_minor_2_color?: string | null
          text_minor_color?: string | null
          user_id: string
        }
        Update: {
          background_color?: string | null
          button_color?: string | null
          button_color_hover?: string | null
          card_color?: string | null
          card_color_hover?: string | null
          created_at?: string | null
          id?: number
          text_major_color?: string | null
          text_minor_2_color?: string | null
          text_minor_color?: string | null
          user_id?: string
        }
      }
      sections: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          portfolio: number
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          portfolio: number
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          portfolio?: number
          title?: string | null
          user_id?: string
        }
      }
      users: {
        Row: {
          created_at: string | null
          description: string | null
          displayed_name: string | null
          github_link: string | null
          id: number
          linkedin_link: string | null
          portfolio: number | null
          twitter_link: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          displayed_name?: string | null
          github_link?: string | null
          id?: number
          linkedin_link?: string | null
          portfolio?: number | null
          twitter_link?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          displayed_name?: string | null
          github_link?: string | null
          id?: number
          linkedin_link?: string | null
          portfolio?: number | null
          twitter_link?: string | null
          user_id?: string | null
          username?: string | null
        }
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
