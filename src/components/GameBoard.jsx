import { pinyin } from 'pinyin-pro/lib/pinyin';

import Tile from './Tile';

const py = pinyin;

const GameBoard = ({ board, boardStates, currentStep, showError, gameState, hardMode }) => (
  <div id="board" class={`${gameState} ${hardMode ? 'hard-mode' : ''}`}>
    {board.map((row, index) => {
      const pinyins = py(row.v.join(''), { type: 'array' });
      return (
        <div
          className={`row ${
            currentStep === index && showError ? 'error' : ''
          } ${currentStep === index ? 'current' : ''} ${boardStates[
            index
          ].join('')}`}
          key={index}
        >
          {row.v.map((letter, i) => (
            <Tile
              key={i}
              letter={letter}
              pinyin={pinyins[i]}
              state={boardStates[index][i]}
            />
          ))}
        </div>
      );
    })}
  </div>
);

export default GameBoard;
