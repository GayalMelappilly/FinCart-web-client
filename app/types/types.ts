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