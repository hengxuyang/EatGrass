import type { FoodPlace } from './types';

const STORAGE_KEY = 'eatgrass.places';

export function loadPlaces(): FoodPlace[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FoodPlace[];
  } catch {
    return [];
  }
}

export function savePlaces(places: FoodPlace[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

export function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
