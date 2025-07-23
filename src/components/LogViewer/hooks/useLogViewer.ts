import { useEffect, useState } from "react";
import type { LogEntry } from "../apis";
import fetchNewLogs from "../apis";
import { useInView } from "react-intersection-observer";

const useLogViewer = (): [boolean, LogEntry[], (node?: Element | null) => void] => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView()

  useEffect(() => {
    fetchNewLogs()
      .then((data) => setLogs(data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if(inView) {
      setIsLoading(true)
      fetchNewLogs()
      .then((data) => setLogs((prevLogs) => [...prevLogs, ...data]))
      .finally(() => setIsLoading(false))
    }
  }, [inView])

  return [isLoading, logs, ref]
};

export default useLogViewer;
