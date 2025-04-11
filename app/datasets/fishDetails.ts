export type FishDetails = {
    id: string;
    name: string;
    scientificName: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    careLevel: string;
    temperament: string;
    diet: string;
    lifespan: string;
    tankSize: string;
    waterParameters: {
      temperature: string;
      ph: string;
      hardness: string;
    };
    origin: string;
    images: string[];
    stock: number;
    relatedFish: RelatedFish[];
  };
  
  export type RelatedFish = {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  
  export const fishData: FishDetails = {
    id: '1',
    name: 'Blue Neon Tetra',
    scientificName: 'Paracheirodon simulans',
    price: 5.99,
    rating: 4.5,
    reviews: 127,
    description: 'The Blue Neon Tetra is a peaceful, schooling fish known for its vibrant blue stripe that runs from its eye to the base of its tail. It is slightly larger than the regular Neon Tetra and has a more intense blue coloration. These fish are perfect for community tanks and are relatively easy to care for.',
    careLevel: 'Beginner',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    lifespan: '3-5 years',
    tankSize: '10+ gallons',
    waterParameters: {
      temperature: '72-76°F (22-24°C)',
      ph: '6.0-7.0',
      hardness: 'Soft to medium',
    },
    origin: 'South America (Amazon Basin)',
    images: ['/images/blue-neon-tetra-1.jpg', '/images/blue-neon-tetra-2.jpg', '/images/blue-neon-tetra-3.jpg'],
    stock: 25,
    relatedFish: [
      { id: '2', name: 'Neon Tetra', price: 2.99, image: '/images/neon-tetra.jpg' },
      { id: '3', name: 'Cardinal Tetra', price: 3.99, image: '/images/cardinal-tetra.jpg' },
      { id: '4', name: 'Black Neon Tetra', price: 3.49, image: '/images/black-neon-tetra.jpg' },
      { id: '5', name: 'Green Neon Tetra', price: 4.99, image: '/images/green-neon-tetra.jpg' },
    ],
  };