import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of, throwError, type Observable } from 'rxjs';
import type { Character, CharacterGender, CharacterPage, CharacterQuery, CharacterStatus } from '../domain/character';
import type { CharacterRepository } from '../domain/character-repository';

interface ApiCharacter {
  id: number;
  name: string;
  image: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

interface ApiPage {
  info: { count: number; pages: number };
  results: ApiCharacter[];
}

const endpoint = 'https://rickandmortyapi.com/api/character';
const emptyPage: CharacterPage = { characters: [], total: 0, pages: 0 };
const statuses: Record<ApiCharacter['status'], CharacterStatus> = {
  Alive: 'alive', Dead: 'dead', unknown: 'unknown',
};
const genders: Record<ApiCharacter['gender'], CharacterGender> = {
  Female: 'female', Male: 'male', Genderless: 'genderless', unknown: 'unknown',
};

function toCharacter(data: ApiCharacter): Character {
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    species: data.species,
    status: statuses[data.status],
    gender: genders[data.gender],
    origin: data.origin.name,
    location: data.location.name,
    episodeCount: data.episode.length,
  };
}

@Injectable()
export class HttpCharacterRepository implements CharacterRepository {
  private readonly http = inject(HttpClient);

  search(query: CharacterQuery): Observable<CharacterPage> {
    let params = new HttpParams().set('page', query.page);
    if (query.name) params = params.set('name', query.name);
    if (query.status) params = params.set('status', query.status);

    return this.http.get<ApiPage>(endpoint, { params, timeout: 12000 }).pipe(
      map(({ info, results }) => ({
        characters: results.map(toCharacter),
        total: info.count,
        pages: info.pages,
      })),
      catchError((error: unknown) =>
        error instanceof HttpErrorResponse && error.status === 404
          ? of(emptyPage)
          : throwError(() => error),
      ),
    );
  }

  findById(id: number): Observable<Character> {
    return this.http.get<ApiCharacter>(`${endpoint}/${id}`, { timeout: 12000 }).pipe(map(toCharacter));
  }
}
