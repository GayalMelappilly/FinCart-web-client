import { Product } from "@/app/types/types";

export const productsMock: Product[] = [
    {
        id: 'PROD-001',
        name: 'Blue Mandarin Dragonet',
        description: 'Stunning blue mandarin dragonet (Synchiropus splendidus) with vibrant colors. Requires mature reef tank with plenty of live copepods.',
        price: 69.99,
        stock: 5,
        category: 'Saltwater Fish',
        images: ['/products/blue-mandarin.jpg'],
        featured: true,
        status: 'active',
        createdAt: '2023-10-15T08:30:00Z',
        updatedAt: '2023-11-01T14:20:00Z',
        specifications: {
            'Scientific Name': 'Synchiropus splendidus',
            'Size': '2-3 inches',
            'Diet': 'Carnivore (copepods, small crustaceans)',
            'Tank Size': '30+ gallons',
            'Temperament': 'Peaceful'
        },
        weight: '0.2 lbs',
        dimensions: '4 × 2 × 2 inches',
        tags: ['reef safe', 'peaceful', 'exotic']
    },
    {
        id: 'PROD-002',
        name: 'Ocellaris Clownfish',
        description: 'Captive-bred ocellaris clownfish. Great beginner saltwater fish, very hardy and peaceful.',
        price: 24.99,
        stock: 20,
        category: 'Saltwater Fish',
        images: ['/products/clownfish.jpg'],
        featured: true,
        status: 'active',
        createdAt: '2023-09-22T10:15:00Z',
        updatedAt: '2023-10-30T09:45:00Z',
        specifications: {
            'Scientific Name': 'Amphiprion ocellaris',
            'Size': '3-4 inches',
            'Diet': 'Omnivore',
            'Tank Size': '20+ gallons',
            'Temperament': 'Semi-aggressive'
        },
        weight: '0.15 lbs',
        dimensions: '3 × 1.5 × 1.5 inches',
        tags: ['beginner friendly', 'popular', 'reef safe']
    },
    {
        id: 'PROD-003',
        name: 'German Blue Ram',
        description: 'Beautiful freshwater cichlid with striking blue coloration and peaceful temperament.',
        price: 18.99,
        stock: 12,
        category: 'Freshwater Fish',
        images: ['/products/blue-ram.jpg'],
        featured: false,
        status: 'active',
        createdAt: '2023-10-05T14:20:00Z',
        updatedAt: '2023-10-28T16:30:00Z',
        specifications: {
            'Scientific Name': 'Mikrogeophagus ramirezi',
            'Size': '2-3 inches',
            'Diet': 'Omnivore',
            'Tank Size': '20+ gallons',
            'Temperament': 'Peaceful'
        },
        weight: '0.1 lbs',
        dimensions: '2.5 × 1 × 1 inches',
        tags: ['colorful', 'freshwater', 'cichlid']
    },
    {
        id: 'PROD-004',
        name: 'Koi Angelfish',
        description: 'Premium quality koi angelfish with striking orange, black, and white patterns.',
        price: 29.99,
        stock: 0,
        category: 'Freshwater Fish',
        images: ['/products/koi-angelfish.jpg'],
        featured: false,
        status: 'out_of_stock',
        createdAt: '2023-09-18T11:10:00Z',
        updatedAt: '2023-10-25T13:40:00Z',
        specifications: {
            'Scientific Name': 'Pterophyllum scalare',
            'Size': '6-8 inches',
            'Diet': 'Omnivore',
            'Tank Size': '30+ gallons',
            'Temperament': 'Semi-aggressive'
        },
        weight: '0.25 lbs',
        dimensions: '6 × 8 × 1 inches',
        tags: ['freshwater', 'angelfish', 'premium']
    },
    {
        id: 'PROD-005',
        name: 'Yellow Tang',
        description: 'Vibrant yellow tang, perfect for reef aquariums. Helps control algae growth.',
        price: 89.99,
        stock: 3,
        category: 'Saltwater Fish',
        images: ['/products/yellow-tang.jpg'],
        featured: true,
        status: 'active',
        createdAt: '2023-10-10T09:25:00Z',
        updatedAt: '2023-11-02T10:15:00Z',
        specifications: {
            'Scientific Name': 'Zebrasoma flavescens',
            'Size': '5-7 inches',
            'Diet': 'Herbivore',
            'Tank Size': '75+ gallons',
            'Temperament': 'Semi-aggressive'
        },
        weight: '0.4 lbs',
        dimensions: '7 × 5 × 1 inches',
        tags: ['reef safe', 'algae eater', 'yellow']
    }
];