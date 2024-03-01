import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { userRoute } from "./app/modules/user/user.route";

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app route
app.use("/api/v1/users/", userRoute);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");

  // Promise.reject("Unhandled promise rejection");
  // throw new Error("This is an error");
  // throw new ApiError(400, "Custom Error");
  // next("Next error");
});

//global Error handler
app.use(globalErrorHandler);

export default app;
