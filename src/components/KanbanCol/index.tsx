import KanbanItem from "../KanbanItem";
import "./KanbanCol.scss";

type KanbanColProps = {
  label: string;
  items: string[];
  index: number;
  numCols: number;
  move: (item: string, fromCol: number, toCol: number) => void;
};

const KanbanCol = ({ label, items, index, numCols, move }: KanbanColProps) => {
  return (
    <div className="kanban_col">
      <h1>{label}</h1>
      <div>
        {items.map((item) => (
          <KanbanItem label={item} index={index} numCols={numCols} move={move} />
        ))}
      </div>
    </div>
  );
};

export default KanbanCol;
