export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    species: string;
    size: string;
}

export const Items = [
    {
        id: 1,
        name: "Betta Fish - Blue Half Moon",
        image: "/api/placeholder/80/80",
        price: 29.99,
        quantity: 1,
        species: "Betta splendens",
        size: "Medium"
    },
    {
        id: 2,
        name: "Neon Tetra - School Pack",
        image: "/api/placeholder/80/80",
        price: 12.50,
        quantity: 6,
        species: "Paracheirodon innesi",
        size: "Small"
    },
    {
        id: 3,
        name: "Fancy Goldfish - Oranda Red Cap",
        image: "/api/placeholder/80/80",
        price: 24.95,
        quantity: 2,
        species: "Carassius auratus",
        size: "Large"
    }
]