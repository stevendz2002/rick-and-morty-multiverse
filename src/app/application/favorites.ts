import type { Character } from '../domain/character';
import type { FavoriteRepository } from '../domain/favorite-repository';

export class Favorites {
  constructor(private readonly repository: FavoriteRepository) {}

  load(): readonly Character[] {
    return this.repository.load();
  }

  toggle(characters: readonly Character[], character: Character): readonly Character[] {
    const next = characters.some(({ id }) => id === character.id)
      ? characters.filter(({ id }) => id !== character.id)
      : [...characters, character];

    this.repository.save(next);
    return next;
  }
}
