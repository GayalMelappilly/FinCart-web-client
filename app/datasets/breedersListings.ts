export type FishListing = {
    id: string;
    name: string;
    image: string;
    alt: string;
};

// Sample fish data
export const fishListings: FishListing[] = [
    {
        id: 'goldfish',
        name: 'Goldfish',
        image: '/neon-tetra.jpeg',
        alt: 'Orange goldfish illustration'
    },
    {
        id: 'betta',
        name: 'Betta Fish',
        image: '/neon-tetra.jpeg',
        alt: 'Blue and red betta fish'
    },
    {
        id: 'angelfish',
        name: 'Angelfish',
        image: '/neon-tetra.jpeg',
        alt: 'Striped angelfish illustration'
    },
    {
        id: 'koi',
        name: 'Koi',
        image: '/neon-tetra.jpeg',
        alt: 'Orange koi fish in water'
    },
    {
        id: 'discus',
        name: 'Discus',
        image: '/neon-tetra.jpeg',
        alt: 'Discus fish sketch with seaweed'
    },
    {
        id: 'guppy',
        name: 'Guppy',
        image: '/neon-tetra.jpeg',
        alt: 'Illustrated guppy fish on teal background'
    }
];