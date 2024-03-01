import { Server } from "http";
import mongoose from "mongoose";
import { error } from "winston";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";

process.on("uncaughtException", () => {
  errorLogger.error("Uncaught Exception Detected", error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("Database connected successfully");

    server = app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Error connecting to database", error);
  }

  process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection Detected,Shutting down....");

    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// event listener for the 'SIGTERM' event
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      console.log("Process terminated");
    });
  }
});
