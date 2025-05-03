// import { FishProduct } from "../components/Seller/Products/AddOrEditProduct/Form";

// export type FishDetails = {
//     id: string;
//     name: string;
//     scientificName: string;
//     price: number;
//     rating: number;
//     reviews: number;
//     description: string;
//     careLevel: string;
//     temperament: string;
//     diet: string;
//     lifespan: string;
//     tankSize: string;
//     waterParameters: {
//       temperature: string;
//       ph: string;
//       hardness: string;
//     };
//     origin: string;
//     images: string[];
//     stock: number;
//     relatedFish: RelatedFish[];
//   };
  
//   export type RelatedFish = {
//     id: string;
//     name: string;
//     price: number;
//     image: string;
//   };
  
//   const fishProducts: FishProduct[] = [
//     {
//       id: 'fp-001',
//       name: 'Blue Betta Fish',
//       description: 'Stunning royal blue male betta with long flowing fins. Known for their vibrant colors and personality.',
//       price: 12.99,
//       quantity_available: 15,
//       category: '17', // Bettas
//       images: ['betta-blue-1.jpg', 'betta-blue-2.jpg'],
//       is_featured: true,
//       listing_status: 'active',
//       created_at: '2023-05-15T10:30:00Z',
//       updated_at: '2023-06-20T14:15:00Z',
//       age: '6 months',
//       size: '2.5 inches',
//       color: 'Royal Blue',
//       breed: 'Halfmoon Betta',
//       care_instructions: {
//         tank_size: 'Minimum 5 gallons',
//         temperature: '76-82°F',
//         ph_level: '6.5-7.5',
//         compatibility: 'Best kept alone'
//       },
//       dietary_requirements: {
//         food_type: 'Betta pellets, frozen/live food',
//         feeding_frequency: '2-3 small meals daily'
//       },
//       view_count: 342
//     },
//     {
//       id: 'fp-002',
//       name: 'Premium Goldfish Comet',
//       description: 'Healthy comet goldfish with bright orange coloration and long flowing tail. Excellent for ponds.',
//       price: 8.50,
//       quantity_available: 25,
//       category: '18', // Goldfish
//       images: ['comet-goldfish-1.jpg', 'comet-goldfish-2.jpg'],
//       is_featured: true,
//       listing_status: 'active',
//       created_at: '2023-06-01T09:15:00Z',
//       updated_at: '2023-06-18T11:20:00Z',
//       age: '4 months',
//       size: '3 inches',
//       color: 'Bright Orange',
//       breed: 'Comet',
//       care_instructions: {
//         tank_size: '20 gallons for first fish +10 per additional',
//         temperature: '65-72°F',
//         ph_level: '7.0-7.4',
//         compatibility: 'Peaceful community fish'
//       },
//       dietary_requirements: {
//         food_type: 'Goldfish flakes, pellets, vegetables',
//         feeding_frequency: '2 times daily'
//       },
//       view_count: 215
//     },
//     {
//       id: 'fp-003',
//       name: 'Neon Tetra - School of 10',
//       description: 'Vibrant neon tetras that add brilliant blue and red colors to your aquarium. Best kept in schools.',
//       price: 24.99,
//       quantity_available: 8,
//       category: '7', // Tetras
//       images: ['neon-tetra-group.jpg', 'neon-tetra-closeup.jpg'],
//       is_featured: false,
//       listing_status: 'active',
//       created_at: '2023-06-10T14:45:00Z',
//       updated_at: '2023-06-22T16:30:00Z',
//       age: '3 months',
//       size: '1.5 inches',
//       color: 'Blue/Red',
//       care_instructions: {
//         tank_size: 'Minimum 10 gallons',
//         temperature: '70-81°F',
//         ph_level: '6.0-7.0',
//         compatibility: 'Peaceful community fish'
//       },
//       dietary_requirements: {
//         food_type: 'Flakes, micro pellets, brine shrimp',
//         feeding_frequency: '2 times daily'
//       },
//       view_count: 178
//     },
//     {
//       id: 'fp-004',
//       name: 'Premium Aquarium Starter Kit',
//       description: 'Complete 20-gallon aquarium kit with filter, heater, LED lighting and all accessories.',
//       price: 149.99,
//       quantity_available: 12,
//       category: '28', // Aquarium Equipment
//       images: ['aquarium-kit-1.jpg', 'aquarium-kit-2.jpg', 'aquarium-kit-3.jpg'],
//       is_featured: true,
//       listing_status: 'active',
//       created_at: '2023-05-01T08:00:00Z',
//       updated_at: '2023-06-15T10:45:00Z',
//       care_instructions: {
//         setup: 'Includes step-by-step guide',
//         maintenance: 'Weekly 25% water changes recommended'
//       },
//       dietary_requirements: {},
//       view_count: 421
//     },
//     {
//       id: 'fp-005',
//       name: 'Rare Black Orchid Betta',
//       description: 'Exclusive black orchid betta with iridescent scales and dramatic finnage. Limited availability.',
//       price: 29.99,
//       quantity_available: 0,
//       category: '17', // Bettas
//       images: ['black-orchid-betta-1.jpg', 'black-orchid-betta-2.jpg'],
//       is_featured: false,
//       listing_status: 'out_of_stock',
//       created_at: '2023-04-20T11:20:00Z',
//       updated_at: '2023-06-10T09:10:00Z',
//       age: '8 months',
//       size: '3 inches',
//       color: 'Black/Iridescent',
//       breed: 'Black Orchid',
//       care_instructions: {
//         tank_size: 'Minimum 5 gallons',
//         temperature: '78-80°F',
//         ph_level: '6.5-7.0',
//         compatibility: 'Must keep alone'
//       },
//       dietary_requirements: {
//         food_type: 'High protein betta food, bloodworms',
//         feeding_frequency: '2 small meals daily'
//       },
//       view_count: 587
//     },
//     {
//       id: 'fp-006',
//       name: 'Java Fern Aquatic Plant',
//       description: 'Hardy low-light aquarium plant that attaches to driftwood or rocks. Helps improve water quality.',
//       price: 7.99,
//       quantity_available: 42,
//       category: '26', // Aquatic Plants
//       images: ['java-fern-1.jpg', 'java-fern-2.jpg'],
//       is_featured: false,
//       listing_status: 'active',
//       created_at: '2023-06-05T13:10:00Z',
//       updated_at: '2023-06-20T15:30:00Z',
//       size: '4-6 inch leaves',
//       care_instructions: {
//         lighting: 'Low to moderate',
//         temperature: '68-82°F',
//         growth_rate: 'Slow',
//         placement: 'Attach to hardscape'
//       },
//       dietary_requirements: {
//         fertilization: 'Beneficial but not required'
//       }
//     },
//     {
//       id: 'fp-007',
//       name: 'Assorted Mystery Snails - Pack of 5',
//       description: 'Colorful freshwater snails that help clean algae. Random color assortment (gold, blue, ivory, etc).',
//       price: 14.95,
//       quantity_available: 7,
//       category: '25', // Aquatic Snails
//       images: ['mystery-snails.jpg'],
//       is_featured: false,
//       listing_status: 'active',
//       created_at: '2023-06-12T16:20:00Z',
//       updated_at: '2023-06-21T12:40:00Z',
//       size: '1-2 inches',
//       color: 'Assorted',
//       care_instructions: {
//         tank_size: 'Minimum 5 gallons',
//         temperature: '68-82°F',
//         ph_level: '7.0-7.5',
//         calcium: 'Require calcium for shell health'
//       },
//       dietary_requirements: {
//         food_type: 'Algae, vegetables, sinking pellets',
//         feeding_frequency: 'Daily'
//       }
//     }
//   ];
  