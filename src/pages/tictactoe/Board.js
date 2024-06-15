import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import { useState } from "react";
import { Button } from "bootstrap";

function Square({ value, onSquareClicked }) {
  return (
    <button
      onClick={onSquareClicked}
      className="square btn btn-outline-primary"
    >
      {value}
    </button>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }
    onPlay(nextSquares);
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 5, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[b] === squares[c] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner" + winner;
  } else {
    status = "Next player" + (xIsNext ? "X" : "0");
  }
  return (
    <div className="board-container d-flex flex-column align-items-center mt-4">
      <div className="status">{status}</div>
      <div className="board-row d-flex">
        <Square
          value={squares[0]}
          onSquareClicked={() => {
            handleClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onSquareClicked={() => {
            handleClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onSquareClicked={() => {
            handleClick(2);
          }}
        />
      </div>
      <div className="board-row d-flex">
        <Square
          value={squares[3]}
          onSquareClicked={() => {
            handleClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onSquareClicked={() => {
            handleClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onSquareClicked={() => {
            handleClick(5);
          }}
        />
      </div>
      <div className="board-row d-flex">
        <Square
          value={squares[6]}
          onSquareClicked={() => {
            handleClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onSquareClicked={() => {
            handleClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onSquareClicked={() => {
            handleClick(8);
          }}
        />
      </div>
    </div>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentmove,setCurrentmove]=useState(0);
  const xIsNext = currentmove%2===0;
  const currentSquares = history[currentmove];
  function handlePlay(nextSquares) {
const nextHistory = [...history.slice(0,currentmove + 1), nextSquares]
    setHistory(nextHistory);
setCurrentmove(nextHistory.length-1) 
  }
  function jumpTo(nextmove) {
    setCurrentmove(nextmove);

  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return(
      <li key={move}>
        <button onClick={()=>{jumpTo(move)}}>{description}</button>
      </li>
    )
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
</div>
    </div>
  );
}
