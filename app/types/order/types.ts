export interface OrderData {
    orderItems: Array<{ fishId: string; quantity: number }>;
    shippingDetails: {
        fullName: string;
        address: string;
        aptSuite: string;
        city: string;
        state: string;
        country: string;
        zip: string;
        email: string;
        phone: string;
        shipping_cost: number;
        shipping_method: string;
    };
    couponCode: string | null;
    pointsToUse: number | null;
    orderNotes: string | null;
    guestInfo: {
        email: string;
        fullName: string;
        phoneNumber: string;
    } | null;
    paymentDetails?: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        payment_method: string;
    };
}