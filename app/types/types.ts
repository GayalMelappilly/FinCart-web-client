import React from "react"

export type FormDataType = {
    fullName: string,
    address: string,
    aptSuite: string,
    city: string,
    state: string,
    zip: string,
    email: string,
    phone: string,
    cardNumber: string,
    expDate: string,
    nameOnCard: string,
}

export type OrderDetailsType = {
    items: OrderDetailsItemsType[],
    subtotal: number,
    total: number
}

type OrderDetailsItemsType = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    image: string
}


// Wish list items interface
export interface WishlistItemInterface {
    id: number;
    name: string;
    image: string;
    price: number;
    species: string;
    size: string;
    inStock: boolean;
}

export type OrderStatus = 'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderCountsInterface {
    All: number;
    Processing: number;
    Shipped: number;
    Delivered: number;
    Cancelled: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    featured: boolean;
    status: 'active' | 'draft' | 'out_of_stock';
    createdAt: string;
    updatedAt: string;
    specifications: {
        [key: string]: string;
    };
    weight: string;
    dimensions: string;
    tags: string[];
}

export type ProductView = 'list' | 'add' | 'edit' | 'view';


// set-profile

export type ProfileFormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  profileImage: string | null;
  userType: 'customer' | 'breeder' | 'admin';
  emailVerified: boolean;
  phoneVerified: boolean;
  pointsBalance: number;
  address: {
    addressLine1: string,
    addressLine2: string ,
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
    latitude: string;
    longitude: string;
  };
}