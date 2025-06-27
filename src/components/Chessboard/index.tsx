import { useState } from "react";
import './Chessboard.scss'

const getChessBoard = (n, m) => {
  return Array.from({ length: n }, () => Array.from({ length: m }, () => null));
};

const ChessBoard = ({ n, m }) => {
  const [board, setBoard] = useState(getChessBoard(n, m));

  return (
    <table>
      <tbody>
        {board.map((row, rowIdx) => (
          <tr>
            {row.map((col, colIdx) => (
              <td
                className={(rowIdx + colIdx) % 2 === 0 ? "black" : "white"}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChessBoard;
