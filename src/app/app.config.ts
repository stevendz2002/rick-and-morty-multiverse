import { provideHttpClient } from '@angular/common/http';
import { inject, type ApplicationConfig } from '@angular/core';
import { CharacterUseCases } from './application/character-use-cases';
import { Favorites } from './application/favorites';
import { HttpCharacterRepository } from './infrastructure/http-character-repository';
import { LocalFavoriteRepository } from './infrastructure/local-favorite-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    HttpCharacterRepository,
    { provide: CharacterUseCases, useFactory: () => new CharacterUseCases(inject(HttpCharacterRepository)) },
    { provide: LocalFavoriteRepository, useClass: LocalFavoriteRepository },
    { provide: Favorites, useFactory: () => new Favorites(inject(LocalFavoriteRepository)) },
  ],
};
