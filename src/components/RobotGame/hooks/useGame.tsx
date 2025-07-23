import { useCallback, useEffect, useMemo, useReducer } from "react";

const GRID_SIZE = 5;

type GameState = {
  robotPos: [number, number];
  candyPos: [number, number];
  score: number;
  timer: number;
  isFinished: boolean;
};

type GameAction =
  | { type: "MOVE"; direction: "up" | "down" | "left" | "right" }
  | { type: "COLLISION" }
  | { type: "COUNTDOWN" }
  | { type: "RESET" };

const getRandomPosition = (): [number, number] => {
  const randomRow = Math.floor(Math.random() * GRID_SIZE);
  const randomCol = Math.floor(Math.random() * GRID_SIZE);
  return [randomRow, randomCol];
};

const getCandyPos = (robotPosition: [number, number]) => {
  let candyPosition = getRandomPosition();
  while (
    candyPosition[0] === robotPosition[0] &&
    candyPosition[1] === robotPosition[1]
  ) {
    candyPosition = getRandomPosition();
  }
  return candyPosition;
};

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case "MOVE": {
      if (action.direction === "up") {
        return {
          ...state,
          robotPos:
            state.robotPos[0] !== 0
              ? [state.robotPos[0] - 1, state.robotPos[1]]
              : [...state.robotPos],
        };
      }

      if (action.direction === "down") {
        return {
          ...state,
          robotPos:
            state.robotPos[0] !== GRID_SIZE - 1
              ? [state.robotPos[0] + 1, state.robotPos[1]]
              : [...state.robotPos],
        };
      }

      if (action.direction === "left") {
        return {
          ...state,
          robotPos:
            state.robotPos[1] !== 0
              ? [state.robotPos[0], state.robotPos[1] - 1]
              : [...state.robotPos],
        };
      }

      if (action.direction === "right") {
        return {
          ...state,
          robotPos:
            state.robotPos[1] !== GRID_SIZE - 1
              ? [state.robotPos[0], state.robotPos[1] + 1]
              : [...state.robotPos],
        };
      }

      return { ...state };
    }
    case "COLLISION": {
      const audio = new Audio('https://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg')
      audio.play()
      
      return {
        ...state,
        score: state.score + 1,
        candyPos: getCandyPos(state.robotPos),
      };
    }
    case "COUNTDOWN": {
      if (state.timer > 1) {
        return {
          ...state,
          timer: state.timer - 1,
        };
      } else {
        return {
          ...state,
          timer: 0,
          isFinished: true,
        };
      }
    }
    case "RESET": {
      return initGameState();
    }
    default: {
      throw new Error(`Unsupported action: ${action.type}`);
    }
  }
};

const initGameState = (): GameState => {
  const robotPos = getRandomPosition();
  return {
    robotPos,
    candyPos: getCandyPos(robotPos),
    score: 0,
    timer: 30,
    isFinished: false,
  };
};

const useGame = () => {
  const board = useMemo(
    () =>
      Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE })
      ),
    []
  );
  const initialState = useMemo(() => initGameState(), []);

  // avoid calling initGameState on every render https://react.dev/reference/react/useReducer#avoiding-recreating-the-initial-state
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      dispatch({ type: "MOVE", direction: "up" });
    }

    if (e.key === "ArrowDown") {
      dispatch({ type: "MOVE", direction: "down" });
    }

    if (e.key === "ArrowLeft") {
      dispatch({ type: "MOVE", direction: "left" });
    }

    if (e.key === "ArrowRight") {
      dispatch({ type: "MOVE", direction: "right" });
    }
  }, []);

  // move robot with keyboard
  useEffect(() => {
    if (!state.isFinished) {
      console.log("event listener attached");
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      console.log("event listener removed");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown, state.isFinished]);

  // handle collisions
  useEffect(() => {
    if (
      state.robotPos[0] === state.candyPos[0] &&
      state.robotPos[1] === state.candyPos[1]
    ) {
      dispatch({ type: "COLLISION" });
    }
  }, [state.robotPos, state.candyPos]);

  // handle timer
  useEffect(() => {
    const intervalId = !state.isFinished
      ? setInterval(() => {
          console.log("interval triggered");
          dispatch({ type: "COUNTDOWN" });
        }, 1000)
      : undefined;

    return () => {
      console.log("interval cleared");
      clearInterval(intervalId);
    };
  }, [state.isFinished]);

  return { board, state, dispatch };
};

export default useGame;
