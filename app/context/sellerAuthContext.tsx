"use client";

import { createContext, useContext, useState } from "react";

interface BusinessInfo {
    business_name: string;
    business_type: string;
    legal_business_name: string;
    display_name: string;
    store_description: string;
    logo_url: string;
    website_url: string;
    gstin: string;
    status: string;
}

interface ContactInfo {
    email: string;
    phone: string;
    alternate_phone: string;
}

interface Location {
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    pin_code: string | undefined;
}

interface Address {
    address_line1: string;
    address_line2: string;
    landmark: string;
    address_type: string;
    location: Location;
}

interface Metrics {
    total_sales: number;
    total_orders: number;
    avg_rating: number;
    total_listings: number;
    active_listings: number;
    last_calculated_at: Date;
}

interface Settings {
    auto_accept_orders: boolean;
    default_warranty_period: number;
    return_window: number;
    shipping_provider: string | null;
    min_order_value: number;
}

interface PaymentSettings {
    payment_cycle: string;
    min_payout_amount: number;
}

interface Business {
    id: string;
    businessInfo: BusinessInfo;
    contactInfo: ContactInfo;
    address: Address;
    metrics: Metrics;
    settings: Settings[];
    paymentSettings: PaymentSettings[];
    recentSales: any[]; // Type can be specified more precisely if structure is known
    commission_rate: number;
    created_at: Date;
    updated_at: Date;
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
