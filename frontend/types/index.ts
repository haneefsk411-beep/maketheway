export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  state: string;
  location: string;
  distance: string;
  budget: number;
  weather: string;
  hotelCount: number;
  touristPlacesCount: number;
  coordinates: [number, number]; // [lat, lng] for Leaflet maps
}

export interface Attraction {
  id: string;
  name: string;
  location: string;
  rating: number;
  cost: number;
  image: string;
  description?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  description?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string; // e.g. "$$", "$$$"
  image: string;
}
