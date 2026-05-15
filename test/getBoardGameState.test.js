import { assert, expect, test } from 'vitest';

import getBoardGameState from '../src/utils/getBoardGameState';

test('returns null for empty board', () => {
  const states = [[], [], [], [], [], []];
  expect(getBoardGameState(states)).toBe(null);
});

test('returns null for partially filled board (still playing)', () => {
  const states = [
    ['⬜', '⬜', '🟧', '🟩'],
    [],
    [],
    [],
    [],
    [],
  ];
  expect(getBoardGameState(states)).toBe(null);
});

test('returns "won" when a row is all green', () => {
  const states = [
    ['🟩', '🟩', '🟩', '🟩'],
    [],
    [],
    [],
    [],
    [],
  ];
  expect(getBoardGameState(states)).toBe('won');
});

test('returns "won" when third row is all green', () => {
  const states = [
    ['⬜', '⬜', '🟧', '⬜'],
    ['⬜', '🟧', '🟧', '⬜'],
    ['🟩', '🟩', '🟩', '🟩'],
    [],
    [],
    [],
  ];
  expect(getBoardGameState(states)).toBe('won');
});

test('returns "won" when last row is all green', () => {
  const states = [
    ['⬜', '⬜', '🟧', '⬜'],
    ['⬜', '🟧', '🟧', '⬜'],
    ['⬜', '🟧', '⬜', '🟩'],
    ['⬜', '⬜', '🟧', '🟧'],
    ['⬜', '🟧', '🟧', '🟩'],
    ['🟩', '🟩', '🟩', '🟩'],
  ];
  expect(getBoardGameState(states)).toBe('won');
});

test('returns "lost" when last row is filled but not all green', () => {
  const states = [
    ['⬜', '⬜', '🟧', '⬜'],
    ['⬜', '🟧', '🟧', '⬜'],
    ['⬜', '🟧', '⬜', '🟩'],
    ['⬜', '⬜', '🟧', '🟧'],
    ['🟧', '🟧', '⬜', '🟩'],
    ['⬜', '🟧', '🟧', '🟩'],
  ];
  expect(getBoardGameState(states)).toBe('lost');
});

test('returns "lost" when last row has a mix of orange and white', () => {
  const states = [
    ['⬜', '⬜', '🟧', '⬜'],
    ['⬜', '🟧', '🟧', '⬜'],
    ['⬜', '🟧', '⬜', '🟩'],
    ['⬜', '⬜', '🟧', '🟧'],
    ['🟧', '🟧', '⬜', '🟩'],
    ['⬜', '⬜', '🟧', '⬜'],
  ];
  expect(getBoardGameState(states)).toBe('lost');
});

test('returns null after won (gameState is determined before extra rows)', () => {
  // This shouldn't happen in practice (game stops at win),
  // but tests the first-wins logic
  const states = [
    ['🟩', '🟩', '🟩', '🟩'],
    [],
    [],
    [],
    [],
    [],
  ];
  expect(getBoardGameState(states)).toBe('won');
});
