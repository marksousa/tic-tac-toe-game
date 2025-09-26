"use client";
import { useState } from "react";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: ({ nextSquares }: { nextSquares: Array<string | null> }) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick({ i }: { i: number }) {
    if (squares[i] || calculateWinner({ squares })) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay({ nextSquares });
  }

  const winner = calculateWinner({ squares });
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
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

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
