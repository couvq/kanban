import { Box, Button, Modal, Typography } from "@mui/material";
import useGame from "./hooks/useGame";
import "./RobotGame.scss";

const robotEmoji = "🤖";
const candyEmoji = "🍬";

const RobotGame = () => {
  const { board, state, dispatch } = useGame();

  return (
    <div>
      <Modal
        open={state.isFinished}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "400px",
            height: "300px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your score was {state.score}
          </Typography>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Play again
          </Button>
          </Box>
        </Box>
      </Modal>
      <h1>Robot game</h1>
      <p>
        Instructions: Move the robot with the arrow keys to eat the candy.
        <br />
        Each candy collected increments your score.
      </p>
      <br />
      <p>Score: {state.score}</p>
      <p>Timer: {state.timer}</p>
      <table>
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((val, colIdx) => (
                <td key={`${rowIdx}${colIdx}`}>
                  {state.robotPos[0] === rowIdx &&
                    state.robotPos[1] === colIdx &&
                    robotEmoji}
                  {state.candyPos[0] === rowIdx &&
                    state.candyPos[1] === colIdx &&
                    candyEmoji}
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
