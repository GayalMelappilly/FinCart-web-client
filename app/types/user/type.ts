export type UserType = {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    pointsBalance: number;
    profilePictureUrl: string | null;
    userAddresses: UserAddress[];
    shoppingCarts: ShoppingCart[];
    orders: Order[];
    wishlists: Wishlist[];
    reviews: Review[];
  }
  
  export type UserAddress = {
    id: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    latitude: number | null;
    longitude: number | null;
  }
  
  export type ShoppingCart = {
    id: string;
    createdAt: string;
    updatedAt: string;
    cartItems: CartItem[];
  }
  
  export type CartItem = {
    id: string;
    quantity: number;
    addedAt: string;
    fishListingId: string;
    fishListings: FishListing;
  }
  
  export type FishListing = {
    id: string;
    name: string;
    description: string;
    price: string;
    images: string[];
    size: string;
    color: string;
    breed: string;
  }
  
  export type Order = {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    pointsEarned: number;
    pointsUsed: number;
    discountAmount: number;
    couponCode: string | null;
    orderNotes: string | null;
    shippingDetails: ShippingDetails;
    orderItems: OrderItem[];
  }
  
  export type ShippingDetails = {
    carrier: string;
    trackingNumber: string;
    shippingCost: number;
    estimatedDelivery: string | null;
    actualDelivery: string | null;
    shippingMethod: string;
  }
  
  export type OrderItem = {
    id: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    fishListingId: string;
    fishListings: FishListingSimple;
  }
  
  export type FishListingSimple = {
    id: string;
    name: string;
    description: string;
    images: string[];
  }
  
  export type Wishlist = {
    id: string;
    name: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    wishlistItems: WishlistItem[];
  }
  
  export type WishlistItem = {
    id: string;
    addedAt: string;
    notes: string | null;
    fishListingId: string;
    fishListings: FishListing;
  }
  
  export type Review = {
    id: string;
    rating: number;
    reviewText: string;
    reviewImages: string[];
    createdAt: string;
    isVerifiedPurchase: boolean;
    fishListingId: string;
    fishListings: {
      id: string;
      name: string;
      images: string[];
    };
  }