type Breeder = {
    id: number;
    name: string;
    listingsCount: string;
    logo: string;
};

export const breeders: Breeder[] = [
    { id: 1, name: "Fincart", listingsCount: '500+ listings', logo: '/images/randys-logo.jpg' },
    { id: 2, name: 'Tropical Fish Haven', listingsCount: '1,000+ listings', logo: '/images/tropical-fish-haven-logo.jpg' },
    { id: 3, name: 'AquaHouse', listingsCount: '300+ listings', logo: '/images/aquahouse-logo.jpg' },
    { id: 4, name: 'Ocean City Aquatics', listingsCount: '800+ listings', logo: '/images/ocean-city-logo.jpg' },
];