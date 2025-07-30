// types/seller.ts

// Fish category information
export interface FishCategory {
    name: string;
    description?: string | null;
    image_url?: string | null;
}

// Fish listing with calculated review metrics
export interface FishListing {
    id: string;
    name: string;
    description: string;
    price: number | string; // Can be Decimal from DB
    quantity_available: number;
    images: string[];
    age?: string | null;
    size?: string | null;
    color?: string | null;
    breed?: string | null;
    is_featured?: boolean | null;
    created_at?: Date | null;
    updated_at?: Date | null;
    listing_status?: string | null;
    care_instructions?: Record<string, string> | null;
    dietary_requirements?: Record<string, string> | null;
    view_count?: number | null;
    fish_categories: FishCategory;
    review_count: number;
    average_rating: number;
}

export interface FishListingCamelCase {
    id: string;
    name: string;
    description: string;
    price: number | string; // Can be Decimal from DB
    quantityAvailable: number;
    images: string[];
    age?: string | null;
    size?: string | null;
    color?: string | null;
    breed?: string | null;
    isFeatured?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    listingStatus?: string | null;
    careInstructions?: Record<string, string> | null;
    dietaryRequirements?: Record<string, string> | null;
    viewCount?: number | null;
    fishCategories: FishCategory;
    reviewCount: number;
    averageRating: number;
}

// Seller location information
export interface SellerLocation {
    city?: string | null;
    state?: string | null;
    country?: string | null;
}

// Seller business metrics
export interface SellerMetrics {
    total_sales: number | string; // Can be Decimal from DB
    total_orders: number;
    avg_rating: number | string; // Can be Decimal from DB
    total_listings: number;
    active_listings: number;
}

// Seller business policies
export interface SellerPolicies {
    auto_accept_orders: boolean;
    warranty_period_days: number;
    return_window_days: number;
    shipping_provider: string;
    min_order_value: number | string; // Can be Decimal from DB
}

// Main seller information
export interface SellerInfo {
    id: string;
    business_name: string;
    business_type: string;
    display_name: string;
    store_description: string | null;
    logo_url: string | null;
    website_url: string | null;
    status: string;
    seller_rating: number | string | null; // Can be Decimal from DB
    joined_date: Date | null;
    location: SellerLocation | null;
    metrics: SellerMetrics;
    policies: SellerPolicies;
}

// Contact information with privacy masking
// export interface SellerContact {
//     email?: string | null;
//     phone?: string | null;
//     alternate_phone?: string | null;
// }

// Complete formatted response
export interface SellerProfileResponse {
    success: boolean;
    data: {
        seller: SellerInfo;
        listings: FishListing[];
    }
}

export interface SellerProfileDetails {
    seller: SellerInfo;
    listings: FishListing[];
}

// API response types for handling loading and error states
export type SellerProfileApiResponse =
    | { status: 'loading' }
    | { status: 'error'; error: string }
    | { status: 'success'; data: SellerProfileResponse };