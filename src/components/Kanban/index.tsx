import { useRef, useState } from "react";
import KanbanCol from "../KanbanCol";
import "./Kanban.scss";

type KanbanItem = {
  label: string;
  items: string[];
};

const initialColumns: KanbanItem[] = [
  {
    label: "TODO",
    items: [],
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
  const newItemRef = useRef(null);

  const addItem = () => {
    const item = newItemRef?.current?.value?.trim();
    if (item !== "") {
      // add item to first column
      columns[0].items.push(item);
      setColumns([...columns]);
      newItemRef.current.value = ''
    }
  };

  const move = (item: string, fromCol: number, toCol: number) => {
    // remove item from fromCol and add it to toCol
    for (let i = 0; i < columns.length; i++) {
      const col: KanbanItem = columns[i];
      if (i === fromCol) {
        col.items = col.items.filter((val) => val !== item);
      }

      if (i === toCol) {
        col.items.push(item);
      }
    }

    setColumns([...columns]);
  };

  return (
    <>
      <div>
        <input type="text" placeholder="New todo..." ref={newItemRef} />
        <button onClick={addItem}>Add item</button>
      </div>
      <div className="kanban_container">
        {columns.map((kanbanCol: KanbanItem, i: number) => (
          <KanbanCol
            key={kanbanCol.label}
            label={kanbanCol.label}
            items={kanbanCol.items}
            index={i}
            numCols={columns.length}
            move={move}
          />
        ))}
      </div>
    </>
  );
};

export default Kanban;
