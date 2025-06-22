import './KanbanItem.scss'

type KanbanItemProps = {
  label: string;
  index: number;
  numCols: number;
  move: (item: string, fromCol: number, toCol: number) => void;
};
const KanbanItem = ({ label, index, move, numCols }: KanbanItemProps) => {
  return (
    <div className='card'>
      {label}
      <div className='btn_group'>
        {index > 0 && <button onClick={() => move(label, index, index - 1)}>Move left</button>}
        {index < numCols - 1 && <button onClick={() => move(label, index, index + 1)}>Move right</button>}
      </div>
    </div>
  );
};

export default KanbanItem;
