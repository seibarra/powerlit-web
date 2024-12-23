export type Json = Record<string, any>

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          province: string
          street: string | null
          uid: string
          zip: string
          created_at?: string
          id: number | undefined
        }
        Insert: {
          city?: string
          created_at?: string
          id?: number
          province?: string
          street?: string | null
          uid?: string
          zip?: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: number
          province?: string
          street?: string | null
          uid?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
        ]
      }
      permissions: {
        Row: {
          description: string
          name: string
        }
        Insert: {
          description?: string
          name: string
        }
        Update: {
          description?: string
          name?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          imagePath: string | null
          imageURL: string | null
          name: string
          path: string
        }
        Insert: {
          imagePath?: string | null
          imageURL?: string | null
          name: string
          path?: string
        }
        Update: {
          imagePath?: string | null
          imageURL?: string | null
          name?: string
          path?: string
        }
        Relationships: []
      }
      product_tags: {
        Row: {
          id: number
          productId: number
          tag: string
        }
        Insert: {
          id?: number
          productId: number
          tag: string
        }
        Update: {
          id?: number
          productId?: number
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tags_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tags_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["name"]
          },
        ]
      }
      products: {
        Row: {
          capacity: number | null
          category: string | null
          createdBy: Json
          description: string
          futurePrices: Json[] | null
          id: number
          imagesPaths: string[]
          imagesURLs: string[]
          name: string
          price: number | null
          shortDescription: string
          updatedBy: Json[] | null
        }
        Insert: {
          capacity?: number | null
          category?: string | null
          createdBy: Json
          description?: string
          futurePrices?: Json[] | null
          id?: number
          imagesPaths?: string[]
          imagesURLs?: string[]
          name?: string
          price?: number | null
          shortDescription?: string
          updatedBy?: Json[] | null
        }
        Update: {
          capacity?: number | null
          category?: string | null
          createdBy?: Json
          description?: string
          futurePrices?: Json[] | null
          id?: number
          imagesPaths?: string[]
          imagesURLs?: string[]
          name?: string
          price?: number | null
          shortDescription?: string
          updatedBy?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["name"]
          },
        ]
      }
      role_permissions: {
        Row: {
          grantedAt: string
          grantedBy: string | null
          id: number
          permission: string
          role: string
        }
        Insert: {
          grantedAt?: string
          grantedBy?: string | null
          id?: number
          permission: string
          role: string
        }
        Update: {
          grantedAt?: string
          grantedBy?: string | null
          id?: number
          permission?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_grantedBy_fkey"
            columns: ["grantedBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "role_permissions_permission_fkey"
            columns: ["permission"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "role_permissions_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          name: string
        }
        Insert: {
          description?: string | null
          name: string
        }
        Update: {
          description?: string | null
          name?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          grantedAt: string | null
          grantedBy: string
          permission: string
          uid: string
        }
        Insert: {
          grantedAt?: string | null
          grantedBy: string
          permission: string
          uid: string
        }
        Update: {
          grantedAt?: string | null
          grantedBy?: string
          permission?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permission_user_id_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "user_permissions_granted_by_fkey"
            columns: ["grantedBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "user_permissions_permission_fkey"
            columns: ["permission"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["name"]
          },
        ]
      }
      user_settings: {
        Row: {
          createdAt: string | null
          language: string | null
          notifications: boolean | null
          theme: string | null
          uid: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          language?: string | null
          notifications?: boolean | null
          theme?: string | null
          uid: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          language?: string | null
          notifications?: boolean | null
          theme?: string | null
          uid?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
        ]
      }
      users: {
        Row: {
          createdAt: string
          email: string
          lastname: string
          name: string
          phonenumber: Json | null
          phonenumber2: Json | null
          role: string
          uid: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          email?: string
          lastname?: string
          name?: string
          phonenumber?: Json | null
          phonenumber2?: Json | null
          role?: string
          uid?: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          email?: string
          lastname?: string
          name?: string
          phonenumber?: Json | null
          phonenumber2?: Json | null
          role?: string
          uid?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
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
