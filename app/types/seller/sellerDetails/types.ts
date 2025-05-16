// Response type for getCurrentSeller endpoint
export interface SellerResponse {
  success: boolean;
  data: SellerData;
  message: string;
}

// Main seller data structure
export interface SellerData {
  id: string;
  businessInfo: BusinessInfo;
  contactInfo: ContactInfo;
  address: Address | null;
  metrics: SellerMetrics;
  settings: SellerSettings | null;
  paymentSettings: SellerPaymentSettings | null;
  recentSales: SellerSalesHistory[];
  salesChartData: SalesChartData[];
  topSellingProducts: TopSellingProduct[];
  topFishListings: TopFishListing[];
  recentOrders: RecentOrder[];
  commissionRate: number | null;
  createdAt: string;
  updatedAt: string;
}

// Business information 
export interface BusinessInfo {
  businessName: string;
  businessType: string;
  legalBusinessName: string;
  displayName: string;
  storeDescription: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  gstin: string | null;
  status: string;
}

// Contact information
export interface ContactInfo {
  email: string;
  phone: string;
  alternatePhone: string | null;
}

// Address information
export interface Address {
  addressLine1: string;
  addressLine2: string | null;
  landmark: string | null;
  addressType: string | null;
  location: Location | {
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
}

// Location details
export interface Location {
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

// Seller metrics
export interface SellerMetrics {
  totalSales: number;
  totalOrders: number;
  avgRating: number;
  totalListings: number;
  activeListings: number;
  lastCalculatedAt: string | null;
  dashboard: {
    revenue: MetricWithTrend;
    orders: MetricWithTrend;
    customers: MetricWithTrend;
    avgOrderValue: MetricWithTrend;
  };
}

// Metric with trend information
export interface MetricWithTrend {
  total: string | number;
  percentChange: string;
  trend: 'up' | 'down';
}

// Seller settings
export interface SellerSettings {
  autoAcceptOrders: boolean;
  defaultWarrantyPeriod: number;
  returnWindow: number;
  shippingProvider: string;
  minOrderValue: number;
}

// Payment settings
export interface SellerPaymentSettings {
  paymentCycle: string;
  minPayoutAmount: number;
}

// Sales history for a specific day
export interface SellerSalesHistory {
  date: string;
  dailySales: number;
  orderCount: number;
  newCustomers: number;
  cancellations: number;
}

// Formatted sales data for charts
export interface SalesChartData {
  month: string;
  sales: number;
}

// Top selling product data
export interface TopSellingProduct {
  id: string;
  name: string;
  stock: number;
  sold: number;
  image: string | null;
}

// Top fish listing data
export interface TopFishListing {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  isFeatured: boolean;
  viewCount: number;
  reviewCount: number;
  createdAt: string;
}

// Recent order data
export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
}