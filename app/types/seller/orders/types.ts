// User type
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
}

// Fish listing type
export interface FishListing {
  id: string;
  name: string;
  price: string;
  images: string[];
}

// Payment details type
export interface PaymentDetails {
  id: string;
  payment_date: string;
  payment_method: string;
  status: string;
}

// Shipping details type
export interface ShippingDetails {
  id: string;
  shipping_method: string;
  carrier: string | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  actual_delivery: string | null;
}

// Order item type
export interface OrderItem {
  id: string;
  order_id: string;
  fish_listing_id: string;
  fish_listings: FishListing;
  quantity: number;
  unit_price: string;
  total_price: string;
  created_at: string;
}

// Main order type
export interface Order {
  id: string;
  user_id: string;
  users: User;
  total_amount: string;
  status: string;
  created_at: string;
  updated_at: string;
  coupon_code: string | null;
  discount_amount: string;
  points_earned: number;
  points_used: number;
  order_notes: string | null;
  payment_details_id: string;
  payment_details: PaymentDetails;
  shipping_details_id: string;
  shipping_details: ShippingDetails;
  order_items: OrderItem[];
}

// Array of orders type
export type Orders = Order[];
