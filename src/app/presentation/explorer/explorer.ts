import { Component, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap } from 'rxjs';
import { CharacterUseCases } from '../../application/character-use-cases';
import type { Character, CharacterPage, CharacterQuery } from '../../domain/character';
import { CharacterCard } from '../character-card/character-card';

type CatalogState =
  | { kind: 'loading' | 'error' }
  | { kind: 'ready'; data: CharacterPage; query: CharacterQuery };

const initialQuery: CharacterQuery = { name: '', status: '', page: 1 };

@Component({
  selector: 'app-explorer',
  imports: [CharacterCard],
  templateUrl: './explorer.html',
})
export class Explorer {
  readonly favoriteIds = input.required<ReadonlySet<number>>();
  readonly selected = output<Character>();
  readonly favoriteToggled = output<Character>();
  private readonly characters = inject(CharacterUseCases);
  private readonly searches = new Subject<string>();
  private readonly requests = new Subject<CharacterQuery>();
  protected readonly query = signal(initialQuery);
  protected readonly filters: readonly { value: CharacterQuery['status']; label: string }[] = [
    { value: '', label: 'Todos' },
    { value: 'alive', label: 'Vivos' },
    { value: 'dead', label: 'Muertos' },
    { value: 'unknown', label: 'Desconocidos' },
  ];

  protected readonly catalog = toSignal(
    merge(
      this.requests,
      this.searches.pipe(debounceTime(300), map(() => this.query())),
    ).pipe(
      startWith(initialQuery),
      distinctUntilChanged((previous, current) => previous === current),
      switchMap((query) => this.characters.search(query).pipe(
        map((data): CatalogState => ({ kind: 'ready', data, query })),
        startWith<CatalogState>({ kind: 'loading' }),
        catchError(() => of<CatalogState>({ kind: 'error' })),
      )),
    ),
    { initialValue: { kind: 'loading' } as CatalogState },
  );

  protected search(value: string): void {
    this.query.update((query) => ({ ...query, name: value, page: 1 }));
    this.searches.next(value);
  }

  protected filter(status: CharacterQuery['status']): void {
    this.submit({ ...this.query(), status, page: 1 });
  }

  protected paginate(page: number): void {
    if (this.canPaginate()) this.submit({ ...this.query(), page });
  }

  protected canPaginate(): boolean {
    const state = this.catalog();
    return state.kind === 'ready' && state.query === this.query();
  }

  protected reset(): void {
    this.submit({ ...initialQuery });
  }

  protected retry(): void {
    this.submit({ ...this.query() });
  }

  private submit(query: CharacterQuery): void {
    this.query.set(query);
    this.requests.next(query);
  }
}
