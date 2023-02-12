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
          backgroundColor: string | null
          created_at: string | null
          id: number
          text: string | null
        }
        Insert: {
          backgroundColor?: string | null
          created_at?: string | null
          id?: number
          text?: string | null
        }
        Update: {
          backgroundColor?: string | null
          created_at?: string | null
          id?: number
          text?: string | null
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
          id: number
          portfolio: number | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          portfolio?: number | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          portfolio?: number | null
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
