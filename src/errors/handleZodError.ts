import { ZodError, ZodIssue } from "zod";
import { IGenericMsgResponse } from "../app/interfaces/common";
import { IGenericErrorMsg } from "../app/interfaces/error";

const handleZodError = (error: ZodError): IGenericMsgResponse => {
  const errors: IGenericErrorMsg[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessage: errors,
  };
};

export default handleZodError;
