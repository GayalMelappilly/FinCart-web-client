// types/auth.ts
export interface User {
    name: string;
    email: string;
    phone: string;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface LoginCredentials {
    identifier: string;
    password: string;
  }
  
  export interface Address {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  }
  
  export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    profileImage?: string;
    address: Address;
  }
  
  export interface AuthResponse {
    success: boolean;
    accessToken?: string;
    data?: User;
    message?: string;
  }

  // Current user whole details 

  export interface Address {
    id: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    latitude: number | null;
    longitude: number | null;
    createdAt: string; // ISO date string
    updatedAt: string;
  }
  
  export interface CurrentUserResponse {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    userType: 'customer' | 'admin' | 'seller'; 
    emailVerified: boolean;
    phoneVerified: boolean;
    pointsBalance: number;
    profilePictureUrl: string | null;
    createdAt: string;
    updatedAt: string;
    address: Address;
  }
  

