/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handleCastError from "../../errors/handleCastError";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import { errorLogger } from "../../shared/logger";
import { IGenericErrorMsg } from "../interfaces/error";

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  config.env === "development"
    ? console.log("🔥 globalErrorHandler", error)
    : errorLogger.error("🔥 globalErrorHandler", error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessage: IGenericErrorMsg[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};
export default globalErrorHandler;
