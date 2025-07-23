import { List } from "@mui/material";
import useLogViewer from "./hooks/useLogViewer";
import LogRow from "./LogRow";

const LogViewer = () => {
  const [isLoading, logs, ref] = useLogViewer();

  return (
    <div>
      <List>
        {logs.map((log) => (
          <LogRow log={log} />
        ))}
        {isLoading && 'Loading...'}
        <div id="hidden_in_view_ref" ref={ref}></div>
      </List>
    </div>
  );
};

export default LogViewer;
