import mongoose from "mongoose";
import { IGenericMsgResponse } from "../app/interfaces/common";
import { IGenericErrorMsg } from "../app/interfaces/error";

const handleCastError = (
  err: mongoose.Error.CastError
): IGenericMsgResponse => {
  const errors: IGenericErrorMsg[] = [
    {
      path: err?.path,
      message: "Invalid Semester Id",
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Cast Error",
    errorMessage: errors,
  };
};

export default handleCastError;
