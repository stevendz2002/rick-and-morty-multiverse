export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown';

export interface Character {
  readonly id: number;
  readonly name: string;
  readonly image: string;
  readonly status: CharacterStatus;
  readonly species: string;
  readonly gender: CharacterGender;
  readonly origin: string;
  readonly location: string;
  readonly episodeCount: number;
}

export interface CharacterQuery {
  readonly name: string;
  readonly status: CharacterStatus | '';
  readonly page: number;
}

export interface CharacterPage {
  readonly characters: readonly Character[];
  readonly total: number;
  readonly pages: number;
}
