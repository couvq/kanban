import KanbanItem from "../KanbanItem";
import "./KanbanCol.scss";

type KanbanColProps = {
  label: string;
  items: string[];
};

const KanbanCol = ({ label, items }: KanbanColProps) => {
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    const draggedElementId = e.dataTransfer.getData("text");
    console.log(draggedElementId);
    console.log(`dropped over col ${label}`);
  };
  return (
    <div className="kanban_col" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h1>{label}</h1>
      <div>
        {items.map((item) => (
          <KanbanItem label={item} />
        ))}
      </div>
    </div>
  );
};

export default KanbanCol;
