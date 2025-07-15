export type ShippingDetailsType = {
    fullName: string,
    address: string,
    aptSuite: string,
    city: string,
    state: string,
    country: string,
    zip: string,
    email: string,
    phone: string,
}

export type OrderItem = {
    id: string;
    fishListingId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    fishListings: {
        id: string;
        name: string;
        description: string;
        images: string[];
    };
}

export type PaymentDetailsType = {
    cardNumber: string,
    expDate: string,
    nameOnCard: string
}

export type OrderDetailsType = {
    fishId: string | undefined,
    quantity: number
}

export type GuestOrder = {
    orderId: string;
    orderStatus: string;
    totalAmount: number;
    estimatedDelivery: string | null;
    pointsEarned: number;
    isGuestOrder: boolean;
    orderItems: OrderItem[];
    shippingDetails: ShippingDetailsType;
    couponCode: string | null;
    pointsToUse: number;
    orderNotes: string | null;
    createdAt: string;
}