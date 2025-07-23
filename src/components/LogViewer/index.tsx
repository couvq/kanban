import { List } from "@mui/material";
import { useEffect, useState } from "react";
import fetchNewLogs, { type LogEntry } from "./apis";
import LogRow from "./LogRow";

const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  useEffect(() => {
    fetchNewLogs().then((data) => setLogs(data));
  }, []);
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
