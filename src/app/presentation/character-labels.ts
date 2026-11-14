import type { CharacterStatus } from '../domain/character';

export const statusLabels: Record<CharacterStatus, string> = {
  alive: 'Vivo',
  dead: 'Muerto',
  unknown: 'Desconocido',
};

const speciesLabels: Readonly<Record<string, string>> = {
  Human: 'Humano', Alien: 'Alienígena', Humanoid: 'Humanoide',
  'Poopybutthole': 'Poopybutthole', 'Mythological Creature': 'Criatura mitológica',
  Animal: 'Animal', Robot: 'Robot', Cronenberg: 'Cronenberg', Disease: 'Enfermedad',
  unknown: 'Desconocida',
};

export function speciesLabel(species: string): string {
  return speciesLabels[species] ?? (species || 'Desconocida');
}
