// Base category information
interface ParentCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
}

// Child category with product count
interface ChildCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  feature: boolean;
  productCount: number;
  createdAt: Date | object;
  updatedAt: Date | object;
}

// Main featured category structure
interface FeaturedCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  feature: boolean;
  parentCategoryId: string | null;
  productCount: number;
  createdAt: Date | object;
  updatedAt: Date | object;
  parentCategory: ParentCategory | null;
  childCategories: ChildCategory[];
}

// API Response structure
interface FeaturedCategoriesResponse {
  success: boolean;
  data: FeaturedCategory[];
  count: number;
  message?: string;
}

// Error response structure
interface FeaturedCategoriesErrorResponse {
  success: false;
  error: string;
  data: [];
  message: string;
}

// Union type for complete response
type FeaturedCategoriesApiResponse = FeaturedCategoriesResponse | FeaturedCategoriesErrorResponse;

// Export all types
export type {
  ParentCategory,
  ChildCategory,
  FeaturedCategory,
  FeaturedCategoriesResponse,
  FeaturedCategoriesErrorResponse,
  FeaturedCategoriesApiResponse
};