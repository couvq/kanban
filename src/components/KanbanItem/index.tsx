type KanbanItemProps = {
  label: string;
};
const KanbanItem = ({ label }: KanbanItemProps) => {
  const handleDragStart = (e) => e.dataTransfer.setData("text", e.target.id);
  
  return <div draggable onDragStart={handleDragStart} id={label}>{label}</div>;
};

export default KanbanItem;
