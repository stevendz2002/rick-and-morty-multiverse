import { Component, input, output } from '@angular/core';
import type { Character } from '../../domain/character';
import { speciesLabel, statusLabels } from '../character-labels';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  readonly character = input.required<Character>();
  readonly favorite = input.required<boolean>();
  readonly selected = output<Character>();
  readonly favoriteToggled = output<Character>();
  protected readonly statusLabels = statusLabels;
  protected readonly speciesLabel = speciesLabel;
}
