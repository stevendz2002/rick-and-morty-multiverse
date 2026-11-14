import type { CharacterQuery } from '../domain/character';
import type { CharacterRepository } from '../domain/character-repository';

export class CharacterUseCases {
  constructor(private readonly repository: CharacterRepository) {}

  search(query: CharacterQuery) {
    return this.repository.search({ ...query, name: query.name.trim() });
  }

  getDetails(id: number) {
    return this.repository.findById(id);
  }
}
