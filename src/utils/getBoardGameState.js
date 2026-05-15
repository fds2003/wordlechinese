/**
 * Derive the game outcome from the board states.
 * @param {string[][]} boardStates — array of per‑row ⬜/🟧/🟩 arrays
 * @returns {'won' | 'lost' | null}
 */
const getBoardGameState = (boardStates) => {
  const won = boardStates.some(
    (row) => !!row.length && row.every((s) => s === '🟩'),
  );
  if (won) return 'won';
  const lastRow = boardStates[boardStates.length - 1];
  const lost = !!lastRow.length && !lastRow.every((s) => s === '🟩');
  if (lost) return 'lost';
  return null;
};

export default getBoardGameState;
