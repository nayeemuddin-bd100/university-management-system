import { IGenericErrorMsg } from "./error";

export type IGenericMsgResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMsg[];
};
