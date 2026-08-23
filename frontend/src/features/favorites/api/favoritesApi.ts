import type { Favorite } from '../types/favorites';

const storageKey = (userId: number) => `cheemo_favorites_${userId}`;

function readFavorites(userId: number): Favorite[] {
  const stored = localStorage.getItem(storageKey(userId));
  if (!stored) return [];
  try {
    return JSON.parse(stored) as Favorite[];
  } catch {
    return [];
  }
}

function writeFavorites(userId: number, favorites: Favorite[]): void {
  localStorage.setItem(storageKey(userId), JSON.stringify(favorites));
}

export async function getFavorites(userId: number): Promise<Favorite[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return readFavorites(userId);
}

export async function addFavorite(userId: number, productId: number): Promise<Favorite[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const favorites = readFavorites(userId);
  const alreadyExists = favorites.some((f) => f.product_id === productId);
  if (alreadyExists) return favorites;

  const updated: Favorite[] = [
    ...favorites,
    { user_id: userId, product_id: productId, created_at: new Date().toISOString() },
  ];
  writeFavorites(userId, updated);
  return updated;
}

export async function removeFavorite(userId: number, productId: number): Promise<Favorite[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const updated = readFavorites(userId).filter((f) => f.product_id !== productId);
  writeFavorites(userId, updated);
  return updated;
}