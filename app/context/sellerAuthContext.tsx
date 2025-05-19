"use client";

import { createContext, useContext, useState } from "react";

interface BusinessInfo {
    businessName: string;
    businessType: string;
    legalBusinessName: string;
    displayName: string;
    storeDescription: string;
    logoUrl: string;
    websiteUrl: string;
    gstin: string;
    status: string;
}

interface ContactInfo {
    email: string;
    phone: string;
    alternatePhone: string;
}

interface Location {
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    pinCode: string | undefined;
}

interface Address {
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    addressType: string;
    location: Location;
}

interface Metrics {
    totalSales: number;
    totalOrders: number;
    avgRating: number;
    totalListings: number;
    activeListings: number;
    lastCalculatedAt: Date;
}

interface Settings {
    autoAcceptOrders: boolean;
    defaultWarrantyPeriod: number;
    returnWindow: number;
    shippingProvider: string | null;
    minOrderValue: number;
}

interface PaymentSettings {
    paymentCycle: string;
    minPayoutAmount: number;
}

interface SalesHistory {
    dailySales: number;
    orderCount: number;
    newCustomers: number;
    cancellations: number;
}

interface Business {
    id: string;
    businessInfo: BusinessInfo;
    contactInfo: ContactInfo;
    address: Address;
    metrics: Metrics;
    settings: Settings[];
    paymentSettings: PaymentSettings[];
    recentSales: SalesHistory[]; 
    commissionRate: number;
    createdAt: Date;
    updatedAt: Date;
}

type SellerAuthContextType = {
    sellerData: Business | null,
    setSellerData: (sellerData: Business | null) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const SellerAuthContext = createContext<SellerAuthContextType | null>(null);

export const SellerAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [sellerData, setSellerData] = useState<Business | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <SellerAuthContext.Provider value={{ sellerData, setSellerData, isLoggedIn, setIsLoggedIn }}>
            {children}
        </SellerAuthContext.Provider>
    );
};

export const useSellerAuth = () => {
    const context = useContext(SellerAuthContext);
    if (!context) throw new Error("useSellerAuth must be used within AuthProvider");
    return context;
};
