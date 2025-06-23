import "./AddColumn.scss";

type AddColumnProps = {
  add: (label: string) => void;
};

const AddColumn = ({ add }: AddColumnProps) => {
  const label = "new column";
  return (
    <div className="addcolumn_icon" onClick={() => add(label)}>
      &#43;
    </div>
  );
};

export default AddColumn;
