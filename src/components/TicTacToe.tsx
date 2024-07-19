import React, { useState } from 'react';
import Board from './Board';


const Game: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [playerX, setPlayerX] = useState<string>('Player X');
  const [playerO, setPlayerO] = useState<string>('Player O');

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const result = calculateWinner(squares);
  const isDraw = !result && squares.every(square => square !== null);
  const status = result
    ? `CHIẾN THẮNG: ${result === 'X' ? playerX : playerO}`
    : isDraw
    ? 'Hòa!'
    : `Lượt của: ${xIsNext ? playerX : playerO}`;

  return (
    <div className="game-container">
      <div className="player-inputs">
        <label>
          Player X:
          <input
            type="text"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            placeholder=" Nhập tên người chơi X"
          />
        </label>
        <label>
          Player O:
          <input
            type="text"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            placeholder="Nhập tên người chơi O"
          />
        </label>
      </div>
      <div className="game-status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="restart-button" onClick={handleRestart}>
        Khởi động lại trò chơi
      </button>
    </div>
  );
};

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

const calculateWinner = (squares: Array<string | null>): string | null => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
