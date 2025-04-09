type FeaturedFish = {
    id: number;
    name: string;
    price: number;
    image: string;
};

export const featuredFish: FeaturedFish[] = [
    { id: 1, name: 'Gold Fish', price: 2.99, image: '/images/neon-tetra.jpg' },
    { id: 2, name: 'Arowana', price: 29.99, image: '/images/discus.jpg' },
    { id: 3, name: 'Molly', price: 1.99, image: '/images/molly.jpg' },
    { id: 4, name: 'Guppy', price: 3.99, image: '/images/guppy.jpg' },
];