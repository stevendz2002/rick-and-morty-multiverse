import type { Character } from './character';

export interface FavoriteRepository {
  load(): readonly Character[];
  save(characters: readonly Character[]): void;
}
