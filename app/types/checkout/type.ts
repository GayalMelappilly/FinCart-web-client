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

export type PaymentDetailsType = {
    cardNumber: string,
    expDate: string,
    nameOnCard: string
}

export type OrderDetailsType = {
    fishId: string | undefined,
    quantity: number
}