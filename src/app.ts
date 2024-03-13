import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import routers from "./app/routes";

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app route
// app.use("/api/v1/users/", userRoute);
// app.use("/api/v1/academic-semester/", academicSemesterRoute);
app.use("/api/v1", routers);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");

  // Promise.reject("Unhandled promise rejection");
  // throw new Error("This is an error");
  // throw new ApiError(400, "Custom Error");
  // next("Next error");
});

//global Error handler
app.use(globalErrorHandler);

//handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: "API Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
