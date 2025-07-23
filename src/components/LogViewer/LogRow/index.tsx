import { Collapse, ListItemButton } from "@mui/material";
import type { LogEntry } from "../apis";
import { useState } from "react";

interface LogRowProps {
  log: LogEntry;
}

const LogRow = ({ log }: LogRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setIsExpanded(!isExpanded)}>
        {log.level} | {log.timestamp} | {log.text.substring(0, 100)}...
      </ListItemButton>
      <Collapse in={isExpanded}>{log.text}</Collapse>
    </>
  );
};

export default LogRow;
