export interface FoodPlace {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
  notes: string;
  link: string;
  visited: boolean;
  createdAt: number;
}

export type FoodPlaceInput = Omit<FoodPlace, 'id' | 'latitude' | 'longitude' | 'visited' | 'createdAt'>;
