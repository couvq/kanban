import { faker } from "@faker-js/faker";

export type LogEntry = {
  level: "log" | "warn" | "error";
  timestamp: string;
  text: string;
};

const createLogEntry = (): LogEntry => {
  const levels: Array<"log" | "warn" | "error"> = ["log", "warn", "error"];
  const level: LogEntry["level"] =
    levels[Math.floor(Math.random() * levels.length)];
  const timestamp = faker.date.recent().toISOString();
  const text = faker.lorem.sentences(3);
  return {
    level,
    timestamp,
    text,
  };
};

const fetchNewLogs = (): Promise<LogEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeLogEntries = Array.from({ length: 100 }, createLogEntry);
      resolve(fakeLogEntries);
    }, 200);
  });
};

export default fetchNewLogs;
