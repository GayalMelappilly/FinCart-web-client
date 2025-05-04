import { FishListing } from "../types/list/fishList";

export const encodeFishData = (fish: FishListing): string => {
    return encodeURIComponent(Buffer.from(JSON.stringify(fish)).toString('base64'));
};

export const decodeFishData = (encoded: string): FishListing => {
    try {
        return JSON.parse(Buffer.from(decodeURIComponent(encoded), 'base64').toString('utf-8'));
    } catch (error) {
        console.error('Error decoding fish data:', error);
        // Return a default object or throw an error
        throw new Error('Invalid fish data encoding');
    }
};