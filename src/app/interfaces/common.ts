import { IGenericErrorMsg } from "./error";

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericMsgResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMsg[];
};
