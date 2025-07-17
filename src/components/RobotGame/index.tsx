import useGame from "./hooks/useGame";
import "./RobotGame.scss";

const robotEmoji = "🤖";
const candyEmoji = "🍬";

const RobotGame = () => {
  const { board, state, dispatch } = useGame();

  return (
    <div>
      <h1>Robot game</h1>
      <p>
        Instructions: Move the robot with the arrow keys to eat the candy. 
        <br />
        Each candy collected increments your score.
      </p>
      <p>Score: {state.score}</p>
      <table>
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((val, colIdx) => (
                <td key={`${rowIdx}${colIdx}`}>
                    {state.robotPos[0] === rowIdx && state.robotPos[1] === colIdx && robotEmoji}
                    {state.candyPos[0] === rowIdx && state.candyPos[1] === colIdx && candyEmoji}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RobotGame;
