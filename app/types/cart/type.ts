// types/cart.ts

// export type FishListing = {
//     id: string;
//     name: string;
//     breed: string;
//     color: string;
//     description: string;
//     price: string; // Use number if price is stored as a number
//     size: string;
//     images: string[];
//   }

//   export type CartItem = {
//     id: string; // unique cart item ID
//     fish_listing_id: string;
//     fish_listings: FishListing;
//     quantity: number;
//     added_at: string; // ISO date string
//   }


// Guest cart items
export type GuestCartItems = {
  guestCartItems: GuestCartItem[]
}

export type GuestCartItem = {
  fishListings: {
    breed: string;
    color: string;
    description: string;
    id: string;
    images: string[];
    name: string;
    price: string;
    size: string
  };
  quantity: number;
  fishListingId: string;
  id: string;
  addedAt: Record<string, unknown>;
}

export type StandardResponse = {
  success: boolean;
  message: string
}

