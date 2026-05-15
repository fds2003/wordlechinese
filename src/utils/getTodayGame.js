import { GAMES } from '../game-data';

/** UTC epoch for the first daily puzzle (2022-01-27). */
const GAME_START_UTC_MS = Date.UTC(2022, 0, 27);

/**
 * Returns today's puzzle by computing
 *   floor((UTC_now - epoch) / 1 day) % GAMES.length
 *
 * Matches the build‑time prerender and the answer‑pipeline offset.
 * @returns {{ id: string, idiom: string }}
 */
const getTodayGame = () => {
  const now = new Date();
  const todayUtcMs = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const diff = todayUtcMs - GAME_START_UTC_MS;
  const dayCount = Math.floor(diff / (1000 * 60 * 60 * 24));
  return GAMES[Math.max(0, dayCount % GAMES.length)];
};

export default getTodayGame;
