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
      category: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      group: {
        Row: {
          group_fk: string | null
          id: string
          leaderId: string | null
          something: string
          workerId: string | null
        }
        Insert: {
          group_fk?: string | null
          id?: string
          leaderId?: string | null
          something: string
          workerId?: string | null
        }
        Update: {
          group_fk?: string | null
          id?: string
          leaderId?: string | null
          something?: string
          workerId?: string | null
        }
      }
      group_type: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      ios_subscription: {
        Row: {
          auto_renew_product_id: string | null
          expires_date_ms: string
          id: string
          original_transaction_id: string
          product_id: string | null
          will_auto_renew: boolean
        }
        Insert: {
          auto_renew_product_id?: string | null
          expires_date_ms: string
          id?: string
          original_transaction_id: string
          product_id?: string | null
          will_auto_renew: boolean
        }
        Update: {
          auto_renew_product_id?: string | null
          expires_date_ms?: string
          id?: string
          original_transaction_id?: string
          product_id?: string | null
          will_auto_renew?: boolean
        }
      }
      permission: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      person: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      player: {
        Row: {
          age: number
          first_name: string
          id: string
          last_name: string
          nationality: string
          teamId: string | null
        }
        Insert: {
          age: number
          first_name: string
          id?: string
          last_name: string
          nationality: string
          teamId?: string | null
        }
        Update: {
          age?: number
          first_name?: string
          id?: string
          last_name?: string
          nationality?: string
          teamId?: string | null
        }
      }
      product_description: {
        Row: {
          product_id: string
        }
        Insert: {
          product_id: string
        }
        Update: {
          product_id?: string
        }
      }
      profile: {
        Row: {
          age: number
          first_name: string
          id: string
          ios_subscription_fk: string | null
          last_name: string
          subscription_active: boolean
        }
        Insert: {
          age: number
          first_name: string
          id?: string
          ios_subscription_fk?: string | null
          last_name: string
          subscription_active?: boolean
        }
        Update: {
          age?: number
          first_name?: string
          id?: string
          ios_subscription_fk?: string | null
          last_name?: string
          subscription_active?: boolean
        }
      }
      profile_role_junction: {
        Row: {
          profile_fk: string
          role_fk: string
        }
        Insert: {
          profile_fk: string
          role_fk: string
        }
        Update: {
          profile_fk?: string
          role_fk?: string
        }
      }
      question: {
        Row: {
          id: number
          text: string
          title: string
        }
        Insert: {
          id?: number
          text: string
          title: string
        }
        Update: {
          id?: number
          text?: string
          title?: string
        }
      }
      question_to_category: {
        Row: {
          categoryId: number
          order: number
          postId: number
          postToCategoryId: number
          questionId: number | null
        }
        Insert: {
          categoryId: number
          order: number
          postId: number
          postToCategoryId?: number
          questionId?: number | null
        }
        Update: {
          categoryId?: number
          order?: number
          postId?: number
          postToCategoryId?: number
          questionId?: number | null
        }
      }
      role: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      role_permission_junction: {
        Row: {
          permission_fk: string
          role_fk: string
        }
        Insert: {
          permission_fk: string
          role_fk: string
        }
        Update: {
          permission_fk?: string
          role_fk?: string
        }
      }
      subscription_notification: {
        Row: {
          id: string
          ios_subscription_fk: string | null
          subtype: string | null
          timestamp: string
          type: string
        }
        Insert: {
          id?: string
          ios_subscription_fk?: string | null
          subtype?: string | null
          timestamp: string
          type: string
        }
        Update: {
          id?: string
          ios_subscription_fk?: string | null
          subtype?: string | null
          timestamp?: string
          type?: string
        }
      }
      team: {
        Row: {
          id: string
          name: string
          year_founded: number
        }
        Insert: {
          id?: string
          name: string
          year_founded: number
        }
        Update: {
          id?: string
          name?: string
          year_founded?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: { p_permission_name: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
