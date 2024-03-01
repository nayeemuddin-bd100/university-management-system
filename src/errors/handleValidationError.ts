import mongoose from "mongoose";
import { IGenericMsgResponse } from "../app/interfaces/common";
import { IGenericErrorMsg } from "../app/interfaces/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericMsgResponse => {
  const errors: IGenericErrorMsg[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessage: errors,
  };
};

export default handleValidationError;
