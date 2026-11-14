import { provideHttpClient } from '@angular/common/http';
import { inject, type ApplicationConfig } from '@angular/core';
import { CharacterUseCases } from './application/character-use-cases';
import { HttpCharacterRepository } from './infrastructure/http-character-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    HttpCharacterRepository,
    { provide: CharacterUseCases, useFactory: () => new CharacterUseCases(inject(HttpCharacterRepository)) },
  ],
};
