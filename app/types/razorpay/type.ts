// Define proper types for Razorpay
export interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface RazorpayError {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, unknown>;
}

export interface RazorpayFailureResponse {
    error: RazorpayError;
}

export interface RazorpayOptions {
    key: string | undefined;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes: {
        address: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void;
    };
    handler: (response: RazorpayResponse) => Promise<void>;
}

export interface RazorpayInstance {
    open: () => void;
    on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
}

// Define API error type
export interface ApiError {
    message: string;
    status?: number;
}

