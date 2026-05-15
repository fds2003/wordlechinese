import gameIdioms from '../game-data/game-idioms.csv';
import idiomsTxt from '../game-data/all-idioms.txt?raw';
import idiomDefinitions from '../game-data/idiom-definitions.json';

/** All known 4‑character idioms — the dictionary for guess validation. */
export const ALL_IDIOMS = idiomsTxt.split('\n');

/** Daily puzzle pool — each entry has `id` (shorthash2) and `idiom` (the 4‑char string). */
export const GAMES = gameIdioms.slice(1).map((row) => ({
  id: row[0],
  idiom: row[1],
}));

/**
 * Idiom definition lookup — maps idiom → `{ zh: explanation }`.
 * Built from idioms.json during `npm run data`.
 * Missing entries (e.g. 解放思想) gracefully degrade to null.
 */
export const DEFINITIONS = idiomDefinitions;
