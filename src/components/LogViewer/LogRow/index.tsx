import { ListItemButton } from "@mui/material";
import type { LogEntry } from "../apis";

interface LogRowProps {
  log: LogEntry;
}

const LogRow = ({ log }: LogRowProps) => {
  return (
    <ListItemButton>
      {log.level} | {log.timestamp} | {log.text.substring(0, 100)}...
    </ListItemButton>
  );
};

export default LogRow;
