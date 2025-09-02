// types.ts
export interface FishCategory {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    parent_category_id?: string;
  }
  
  export interface FishListing {
    id: string;
    seller_id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    quantity_available: number;
    images: string[];
    age?: string;
    size?: string;
    color?: string;
    breed?: string;
    is_featured?: boolean;
    created_at?: string;
    updated_at?: string;
    listing_status?: 'active' | 'out_of_stock';
    care_instructions: Record<string, string>;
    dietary_requirements: Record<string, string>;
    view_count?: number;
  }
  
  export interface Seller {
    id: string;
    business_name: string;
    display_name: string;
    store_description?: string;
    logo_url?: string;
    seller_rating?: number;
  }
  
  export interface Review {
    id: string;
    user_id: string;
    fish_listing_id: string;
    rating: number;
    review_text?: string;
    review_images?: string[];
    created_at?: string;
    is_verified_purchase?: boolean;
  }
  
  export interface User {
    id: string;
    email: string;
    full_name: string;
    profile_picture_url?: string;
  }