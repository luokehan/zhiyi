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
      articles: {
        Row: {
          id: string
          title: string
          summary: string
          author: string
          author_title: string | null
          category: string
          status: string
          published_at: string
          cover_image: string
          image_caption: string | null
          reading_time: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          summary: string
          author: string
          author_title?: string | null
          category: string
          status: string
          published_at: string
          cover_image: string
          image_caption?: string | null
          reading_time?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          summary?: string
          author?: string
          author_title?: string | null
          category?: string
          status?: string
          published_at?: string
          cover_image?: string
          image_caption?: string | null
          reading_time?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      article_content: {
        Row: {
          id: string
          article_id: string
          english: string
          chinese: string | null
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          english: string
          chinese?: string | null
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          english?: string
          chinese?: string | null
          position?: number
          created_at?: string
        }
      }
      key_terms: {
        Row: {
          id: string
          article_id: string
          term: string
          definition: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          term: string
          definition: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          term?: string
          definition?: string
          created_at?: string
        }
      }
      complex_sentences: {
        Row: {
          id: string
          article_id: string
          english: string
          chinese: string
          analysis: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          english: string
          chinese: string
          analysis: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          english?: string
          chinese?: string
          analysis?: string
          created_at?: string
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