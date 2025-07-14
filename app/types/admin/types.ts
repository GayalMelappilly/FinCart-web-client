// Base category interface for parent/child category references
export interface CategoryReference {
  id: string;
  name: string;
}

// Child category interface with product count
export interface ChildCategory extends CategoryReference {
  productCount: number;
  feature: boolean;
}

// Main fish category interface
export interface FishCategory {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  parentCategoryId: string | null;
  feature: boolean;
  createdAt: Record<string, Date>; // You might want to replace this with Date if you parse the dates
  updatedAt: Record<string, Date>; // You might want to replace this with Date if you parse the dates
  productCount: number;
  parentCategory: CategoryReference | null;
  childCategories: ChildCategory[];
}