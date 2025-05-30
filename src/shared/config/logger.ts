import type { FastifyLoggerOptions } from "fastify";
import type { PinoLoggerOptions } from "fastify/types/logger";

type ILogger = boolean | (FastifyLoggerOptions & PinoLoggerOptions);

export const logger: ILogger = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss",
      ignore: "hostname",
    },
  },
};
