// utils/logger.js
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
    trace: 6
  },
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
  ]
});

export default logger;

//   NIVELES DE LOGGER
// logger.error(" Error crítico en la aplicación");
// logger.warn("Advertencia: Uso de memoria alto");
// logger.info("Servidor iniciado correctamente");
// logger.http("Petición GET");
// logger.debug("Variable x = 42, verificando valores...");
