import { createLogger, format, transports } from "winston";
import path from "path";
const { combine, timestamp, label, printf, prettyPrint } = format;
import DailyRotateFile from "winston-daily-rotate-file";

const myFormat = printf(({ level, message, label, timestamp }) => {
	const date = new Date(timestamp);
	const formattedDate = date.toLocaleString();

	return `${formattedDate} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
	level: "info",
	format: combine(label({ label: "UM" }), timestamp(), myFormat, prettyPrint()),
	defaultMeta: { service: "user-service" },
	transports: [
		new DailyRotateFile({
			filename: path.join(
				process.cwd(),
				"logs",
				"winston",
				"successes",
				"UM-%DATE%-success.log"
			),
			datePattern: "YYYY-DD-MM-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
		}),
		new transports.Console(),
	],
});

const errorLogger = createLogger({
	level: "error",
	format: combine(label({ label: "UM" }), timestamp(), myFormat, prettyPrint()),
	defaultMeta: { service: "user-service" },

	transports: [
		new DailyRotateFile({
			filename: path.join(
				process.cwd(),
				"logs",
				"winston",
				"errors",
				"UM-%DATE%-error.log"
			),
			datePattern: "YYYY-DD-MM-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
		}),
		new transports.Console(),
	],
});

export { logger, errorLogger };
