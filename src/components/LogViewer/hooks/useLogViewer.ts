import { useEffect, useState } from "react";
import type { LogEntry } from "../apis";
import fetchNewLogs from "../apis";

const useLogViewer = (): [boolean, LogEntry[]] => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNewLogs()
      .then((data) => setLogs(data))
      .finally(() => setIsLoading(false));
  }, []);

  return [isLoading, logs]
};

export default useLogViewer;
