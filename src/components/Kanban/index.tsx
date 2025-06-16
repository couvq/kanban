import { useState } from "react";
import KanbanCol from "../KanbanCol";
import "./Kanban.scss";

type KanbanItem = {
  label: string;
  items: string[];
};

const initialColumns: KanbanItem[] = [
  {
    label: "TODO",
    items: ["Walk the dog"],
  },
  {
    label: "Doing",
    items: [],
  },
  {
    label: "Done",
    items: [],
  },
];

const Kanban = () => {
  const [columns, setColumns] = useState<KanbanItem[]>(initialColumns);
  return (
    <>
      <div>
        <input type="text" placeholder="New todo..." />
        <button>Add</button>
      </div>
      <div className="kanban_container">
        {columns.map((kanbanCol: KanbanItem) => (
          <KanbanCol
            key={kanbanCol.label}
            label={kanbanCol.label}
            items={kanbanCol.items}
          />
        ))}
      </div>
    </>
  );
};

export default Kanban;
