import { useState } from "react";
import "./App.css";
import React from "react";
import Confetti from "react-confetti";

export default function App() {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const decideWinner = (board) => {
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
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        console.log("The Winner is ", board[0]);
        return board[a];
      }
    }
    return null;
  };

  const [isXturn, setIsXturn] = useState(true);

  const winner = decideWinner(board);

  const handleClick = (index) => {
    console.log("Clicked", index, winner);

    if (winner === null && board[index] === null) {
      let boardCopy = [...board];
      boardCopy[index] = isXturn ? "X" : "O";
      setBoard(boardCopy);
      setIsXturn(!isXturn);
    }
  };

  const restart = () => {
    setBoard([null, null, null, null, null, null, null, null, null]);
  };

  return (
    <div className="App">
      {winner ? <Confetti /> : ""}

      <div className="heading">
        <h1>
          Hello😃<br></br>Welcome to my Tic-Tac-Toe arena🥳
        </h1>
      </div>
      <div className="board-container">
        <div className="board">
          {board.map((value, index) => (
            <Box value={value} onPlayerClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
      <div className="button">
        <button className="btn" onClick={restart}>
          Restart
        </button>
      </div>
      <div className="winner">
        {winner ? (
          <h2>
            The winner is: {winner}
            <br></br>Thank You❤️
          </h2>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function Box(props) {
  // const [value, setValue] = useState(null)
  const { onPlayerClick, value } = props;
  return (
    <div
      // onClick={()=>setValue(value==="X"?"O":"X")}
      onClick={onPlayerClick}
      style={{ color: value === "X" ? "teal" : "crimson" }}
      className="game-box"
    >
      {value}
    </div>
  );
}
