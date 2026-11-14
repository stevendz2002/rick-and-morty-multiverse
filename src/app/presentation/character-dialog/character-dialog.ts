import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { CharacterUseCases } from '../../application/character-use-cases';
import type { Character, CharacterGender } from '../../domain/character';
import { speciesLabel, statusLabels } from '../character-labels';

type DetailState =
  | { kind: 'loading' | 'error'; character: Character }
  | { kind: 'ready'; character: Character };

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.html',
  styleUrl: './character-dialog.css',
})
export class CharacterDialog {
  private readonly characters = inject(CharacterUseCases);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly selection = new Subject<Character | null>();
  protected readonly statusLabels = statusLabels;
  protected readonly speciesLabel = speciesLabel;
  protected readonly genderLabels: Record<CharacterGender, string> = {
    female: 'Femenino', male: 'Masculino', genderless: 'Sin género', unknown: 'Desconocido',
  };
  protected readonly details = toSignal(this.selection.pipe(
    switchMap((character) => character ? this.characters.getDetails(character.id).pipe(
      map((data): DetailState => ({ kind: 'ready', character: data })),
      startWith<DetailState>({ kind: 'loading', character }),
      catchError(() => of<DetailState>({ kind: 'error', character })),
    ) : of(null)),
  ));

  open(character: Character): void {
    this.selection.next(character);
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected clearSelection(): void {
    this.selection.next(null);
  }

  protected retry(character: Character): void {
    this.selection.next(character);
  }

  protected locationLabel(name: string): string {
    return name === 'unknown' || !name ? 'Desconocida' : name;
  }
}
