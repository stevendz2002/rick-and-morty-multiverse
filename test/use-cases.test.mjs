import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CharacterUseCases } from '../src/app/application/character-use-cases.ts';
import { Favorites } from '../src/app/application/favorites.ts';

test('la búsqueda por nombre conserva filtros y página', async () => {
  const queries = [];
  const useCases = new CharacterUseCases({
    async search(query) { queries.push(query); },
  });
  await useCases.search({ name: '  Rick  ', status: 'alive', page: 2 });
  assert.deepEqual(queries, [{ name: 'Rick', status: 'alive', page: 2 }]);
});

test('los favoritos se guardan y se eliminan por su identificador', () => {
  let saved = [];
  const favorites = new Favorites({
    load: () => saved,
    save: (next) => { saved = next; },
  });
  const rick = { id: 1, name: 'Rick Sanchez' };
  assert.deepEqual(favorites.toggle(favorites.load(), rick), [rick]);
  assert.deepEqual(saved, [rick]);
  assert.deepEqual(favorites.toggle(favorites.load(), { ...rick }), []);
  assert.deepEqual(saved, []);
});
