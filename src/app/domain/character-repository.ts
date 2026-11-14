import type { Observable } from 'rxjs';
import type { Character, CharacterPage, CharacterQuery } from './character';

export interface CharacterRepository {
  search(query: CharacterQuery): Observable<CharacterPage>;
  findById(id: number): Observable<Character>;
}
