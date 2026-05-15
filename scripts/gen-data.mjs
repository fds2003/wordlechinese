import { readFile, writeFile } from 'fs/promises';
import { stringify } from 'csv-stringify/sync';
import hash from 'shorthash2';

const idioms = JSON.parse(
  await readFile(new URL('../data/idioms.json', import.meta.url)),
);
console.log(`Total idioms: ${idioms.length}`);

const letter4idioms = idioms.filter((i) => i.word.length === 4);
console.log(`Total 4-letter idioms: ${letter4idioms.length}`);

const freqIdioms = (
  await readFile(new URL('../data/THUOCL_chengyu.txt', import.meta.url), 'utf8')
)
  .split(/[\n\r]/)
  .map((t) => t.split(/\s/)[0])
  .filter((t) => t.length === 4);
console.log(`Total 4-letter idioms in frequency list: ${freqIdioms.length}`);

const gameIdioms = [];
const allIdioms = new Set();

for (let i = 0, len = freqIdioms.length; i < len; i++) {
  const idiom = freqIdioms[i];
  const id = hash(idiom);
  const dupIdiom = gameIdioms.find((i) => i.id === id);
  if (dupIdiom) {
    throw new Error(`Duplicate id: ${id} for ${idiom} vs ${dupIdiom.idiom}`);
  }
  // This filters out phrases that are NOT idioms.
  // Set 18 here because we've already reached 20th (daily) game
  // So everything before 18 could be not idioms.
  if (i <= 18 || letter4idioms.find((id) => id.word === idiom)) {
    gameIdioms.push({
      id,
      idiom,
    });
  }
  allIdioms.add(idiom);
}

for (let i = 0, len = letter4idioms.length; i < len; i++) {
  const idiom = letter4idioms[i].word;
  allIdioms.add(idiom);
}

const filePath = new URL('../game-data/game-idioms.csv', import.meta.url);

/* ── Stability gate ──────────────────────────────────────────────
 * Changing the order of existing game entries would invalidate
 * the keyboard keys (getIdiomsKeys walks the GAMES array) and
 * break previously shared emoji results. Only appending at the
 * end is safe. */
let existingCount = 0;
try {
  const existing = (
    await readFile(filePath, 'utf8')
  ).trim().split('\n');
  if (existing.length > 0) {
    existingCount = existing.length - 1; // minus header
    for (let i = 0; i < existingCount; i++) {
      const existingId = existing[i + 1].split(',')[0];
      if (gameIdioms[i]?.id !== existingId) {
        throw new Error(
          `Stability violation at row ${i}: existing entry "${existingId}" ` +
          `would move to index ${gameIdioms.findIndex((g) => g.id === existingId)}. ` +
          `Only append new idioms at the END of THUOCL_chengyu.txt.`,
        );
      }
    }
    console.log(`Stability check passed: ${existingCount} existing entries preserved in order`);
  }
} catch (e) {
  if (e.code === 'ENOENT') {
    // First run — nothing to validate
  } else {
    throw e;
  }
}

await writeFile(
  filePath,
  stringify(gameIdioms, {
    header: true,
  }),
);
console.log(
  `File written: ${filePath} (${existingCount} existing + ${gameIdioms.length - existingCount} new)`,
);

const allIdiomsPath = new URL('../game-data/all-idioms.txt', import.meta.url);
await writeFile(allIdiomsPath, [...allIdioms].join('\n'));
console.log(`File written: ${allIdiomsPath}`);

/* ── Definition data ─────────────────────────────────────────────
 * Embed idiom explanations so the app doesn't need a remote API. */
const idiomsLookup = new Map(letter4idioms.map((i) => [i.word, i]));
const definitions = {};
for (const { idiom } of gameIdioms) {
  const entry = idiomsLookup.get(idiom);
  if (entry) {
    definitions[idiom] = { zh: entry.explanation || '' };
  }
}
const defsPath = new URL('../game-data/idiom-definitions.json', import.meta.url);
await writeFile(defsPath, JSON.stringify(definitions));
console.log(`File written: ${defsPath} (${Object.keys(definitions).length} definitions)`);
