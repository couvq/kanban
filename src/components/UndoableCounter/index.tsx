import { useReducer } from "react";
import './UndoableCounter.scss'

/**
 * State
 *  count: number
 *  prevActions: Action[] (stack)
 *  undoneActions: Action[] (stack)
 *
 * Actions
 * add
 * multiply
 * subtract
 * divide
 * reset
 * undo
 * redo
 */

const useUndoableCounter = () => {
  const initialState = {
    count: 0,
    prevActions: [],
    undoneActions: [],
  };
  const undoableCounterReducer = (state, action) => {
    switch (action.type) {
      case "add": {
        const newCount = state.count + action.value;
        return {
          ...state,
          prevActions: [
            ...state.prevActions,
            {
              operation: `+${action.value}`,
              oldVal: state.count,
              newVal: newCount,
            },
          ],
          count: newCount,
        };
      }
      case "multiply": {
        const newCount = state.count * action.value;
        return {
          ...state,
          prevActions: [
            ...state.prevActions,
            {
              operation: `x${action.value}`,
              oldVal: state.count,
              newVal: newCount,
            },
          ],
          count: newCount,
        };
      }
      case "subtract": {
        const newCount = state.count - action.value;
        return {
          ...state,
          prevActions: [
            ...state.prevActions,
            {
              operation: `-${action.value}`,
              oldVal: state.count,
              newVal: newCount,
            },
          ],
          count: newCount,
        };
      }
      case "divide": {
        const newCount = state.count / action.value;
        return {
          ...state,
          prevActions: [
            ...state.prevActions,
            {
              operation: `/${action.value}`,
              oldVal: state.count,
              newVal: newCount,
            },
          ],
          count: newCount,
        };
      }
      case "reset": {
        return initialState;
      }
      case "undo": {
        const prevAction = state.prevActions[state.prevActions.length - 1];
        if (prevAction !== undefined) {
          return {
            undoneActions: [...state.undoneActions, prevAction],
            prevActions: state.prevActions.slice(0, -1),
            count: prevAction.oldVal,
          };
        } else {
          return {
            ...state,
          };
        }
      }
      case "redo": {
        const prevUndoneAction =
          state.undoneActions[state.undoneActions.length - 1];
        if (prevUndoneAction !== undefined) {
          return {
            count: prevUndoneAction.newVal,
            undoneActions: state.undoneActions.slice(0, -1),
            prevActions: [...state.prevActions, prevUndoneAction],
          };
        } else {
          return {
            ...state,
          };
        }
      }
      default: {
        throw new Error(`unknown action: ${action.type}`);
      }
    }
  };
  const [state, dispatch] = useReducer(undoableCounterReducer, initialState);
  return [state, dispatch];
};

export default function UndoableCounter() {
  const [state, dispatch] = useUndoableCounter();

  return (
    <div className="container">
      <div className="actions">
        <button onClick={() => dispatch({ type: "undo" })}>Undo</button>
        <button onClick={() => dispatch({ type: "redo" })}>Redo</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
      <div className="math_container">
        <button onClick={() => dispatch({ type: "divide", value: 2 })}>
          /2
        </button>
        <button onClick={() => dispatch({ type: "subtract", value: 1 })}>
          -1
        </button>
        <div>{state.count}</div>
        <button onClick={() => dispatch({ type: "add", value: 1 })}>+1</button>
        <button onClick={() => dispatch({ type: "multiply", value: 2 })}>
          x2
        </button>
      </div>
      <table>
        <caption>Previous actions</caption>
        <thead>
          <tr>
            <th scope="col">Operation</th>
            <th scope="col">Old</th>
            <th scope="col">New</th>
          </tr>
        </thead>
        <tbody>
          {state.prevActions.map((prevAction, i) => (
            <tr key={i}>
              <td>{prevAction.operation}</td>
              <td>{prevAction.oldVal}</td>
              <td>{prevAction.newVal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
