import { List } from "@mui/material";
import useLogViewer from "./hooks/useLogViewer";
import LogRow from "./LogRow";

const LogViewer = () => {
  const [isLoading, logs] = useLogViewer()

  if(isLoading) return 'Loading...'
  
  return (
    <div>
      <List>
        {logs.map((log) => (
          <LogRow log={log} />
        ))}
      </List>
    </div>
  );
};

export default LogViewer;
