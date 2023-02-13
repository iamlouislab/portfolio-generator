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
          author: string | null
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          keywords: Json | null
          section: number | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          keywords?: Json | null
          section?: number | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          keywords?: Json | null
          section?: number | null
          title?: string | null
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
          user: number | null
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
          user?: number | null
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
          user?: number | null
        }
      }
      sections: {
        Row: {
          author: string | null
          created_at: string | null
          description: string | null
          id: number
          portfolio: number | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          portfolio?: number | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          portfolio?: number | null
          title?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          portfolio: number | null
          profile_picture: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          portfolio?: number | null
          profile_picture?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          portfolio?: number | null
          profile_picture?: string | null
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
