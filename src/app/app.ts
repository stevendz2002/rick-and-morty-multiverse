import { Component, computed, inject, signal } from '@angular/core';
import { Favorites } from './application/favorites';
import type { Character } from './domain/character';
import { CharacterCard } from './presentation/character-card/character-card';
import { CharacterDialog } from './presentation/character-dialog/character-dialog';
import { Explorer } from './presentation/explorer/explorer';

@Component({
  selector: 'app-root',
  imports: [Explorer, CharacterCard, CharacterDialog],
  templateUrl: './app.html',
  styles: `
    .favorites { margin-top: 58px; scroll-margin-top: 24px; }
    .storage-error { margin: 16px 0; color: #ffadb5; }
  `,
})
export class App {
  private readonly favorites = inject(Favorites);
  protected readonly savedCharacters = signal(this.favorites.load());
  protected readonly savedIds = computed(() => new Set(this.savedCharacters().map(({ id }) => id)));
  protected readonly storageError = signal(false);

  protected toggleFavorite(character: Character): void {
    try {
      this.savedCharacters.update((saved) => this.favorites.toggle(saved, character));
      this.storageError.set(false);
    } catch {
      this.storageError.set(true);
    }
  }
}
