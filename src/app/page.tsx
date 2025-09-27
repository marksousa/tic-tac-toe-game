'use client';
import { useState } from 'react';

type SquareValue = 'X' | 'O';

interface SquareProps {
  value: SquareValue | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  const squareClasses = {
    X: 'x-square',
    O: 'o-square',
  } as const;

  return (
    <button
      className={`square ${value ? squareClasses[value as SquareValue] : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: Array<SquareValue | null>;
  onPlay: ({ nextSquares }: { nextSquares: Array<SquareValue | null> }) => void;
  onReset: () => void;
}

function Board({ xIsNext, squares, onPlay, onReset }: BoardProps) {
  function handleClick({ i }: { i: number }) {
    if (squares[i] || calculateWinner({ squares })) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay({ nextSquares });
  }

  const winner = calculateWinner({ squares });
  let status;
  if (winner) {
    status = (
      <>
        Winner:{' '}
        <span className={winner === 'X' ? 'status-x' : 'status-o'}>
          {winner}
        </span>
      </>
    );
  } else {
    status = (
      <>
        Next player:{'  '}
        <span className={xIsNext ? 'status-x' : 'status-o'}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-wrapper">
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick({ i: 0 })}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick({ i: 1 })}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick({ i: 2 })}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick({ i: 3 })}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick({ i: 4 })}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick({ i: 5 })}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick({ i: 6 })}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick({ i: 7 })}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick({ i: 8 })}
          />
        </div>
      </div>

      {winner && (
        <button onClick={onReset} className="reset-button">
          Play Again
        </button>
      )}
    </>
  );
}

function calculateWinner({ squares }: { squares: Array<string | null> }) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay({ nextSquares }: { nextSquares: Array<string | null> }) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          onReset={handleReset}
        />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
