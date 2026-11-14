import type { Character } from '../domain/character';
import type { FavoriteRepository } from '../domain/favorite-repository';

const storageKey = 'multiverse-explorer.favorites.v1';

function isCharacter(value: unknown): value is Character {
  if (typeof value !== 'object' || value === null) return false;

  const { id, name, image, species, status, gender, origin, location, episodeCount } =
    value as Partial<Character>;
  return typeof id === 'number' && Number.isSafeInteger(id) && id > 0
    && typeof name === 'string'
    && typeof image === 'string'
    && typeof species === 'string'
    && (status === 'alive' || status === 'dead' || status === 'unknown')
    && (gender === 'male' || gender === 'female' || gender === 'genderless' || gender === 'unknown')
    && typeof origin === 'string'
    && typeof location === 'string'
    && typeof episodeCount === 'number' && Number.isSafeInteger(episodeCount) && episodeCount >= 0;
}

export class LocalFavoriteRepository implements FavoriteRepository {
  load(): readonly Character[] {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      return Array.isArray(saved) ? saved.filter(isCharacter) : [];
    } catch {
      return [];
    }
  }

  save(characters: readonly Character[]): void {
    localStorage.setItem(storageKey, JSON.stringify(characters));
  }
}
