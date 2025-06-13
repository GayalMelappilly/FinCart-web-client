export interface FishCategory {
    id: string;
    name: string;
    description: string | null;
    image_url: string | null;
  }
  
  export interface Seller {
    id: string;
    displayName: string;
    logoUrl: string | null;
    sellerAddresses: {
      sellerLocations: {
        city: string;
        state: string;
      }
    }
  }
  
  export interface FishListing {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    images: string[];
    age: string | null;
    size: string | null;
    color: string | null;
    breed: string | null;
    isFeatured: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    listingStatus: string | null;
    careInstructions: {
      [key: string]: string
    };
    dietaryRequirements: {
      [key: string]: string
    };
    viewCount: number | null;
    category: FishCategory;
    avgRating: number;
    reviewCount: number;
    users: Seller | null;
  }
  
  export interface PaginationData {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  
  export interface FishListResponse {
    fishListings: FishListing[];
    pagination: PaginationData;
  }
  
  export interface FishListFilters {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    featured?: boolean;
    inStock?: boolean;
    color?: string;
    size?: string;
    breed?: string;
  }