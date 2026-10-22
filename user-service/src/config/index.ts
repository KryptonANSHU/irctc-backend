import "dotenv/config";

type NodeEnv = "development" | "production" | "test";
type LogLevel = "error" | "warn" | "info" | "debug";

interface Config {
  SERVICE_NAME: string;
  PORT: number;
  NODE_ENV: NodeEnv;
  LOG_LEVEL: LogLevel;
  ALLOWED_ORIGINS: string[];
}

const NODE_ENVS: readonly NodeEnv[] = ["development", "production", "test"];
const LOG_LEVELS: readonly LogLevel[] = ["error", "warn", "info", "debug"];

// Returns the env value only if it is one of the allowed options, else the fallback.
const pickOption = <T extends string>(
  value: string | undefined,
  options: readonly T[],
  fallback: T
): T => options.find((option) => option === value) ?? fallback;

export const config: Config = {
  SERVICE_NAME: "user-service",
  PORT: Number(process.env.PORT) || 4001,
  NODE_ENV: pickOption(process.env.NODE_ENV, NODE_ENVS, "development"),
  LOG_LEVEL: pickOption(process.env.LOG_LEVEL, LOG_LEVELS, "info"),
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
