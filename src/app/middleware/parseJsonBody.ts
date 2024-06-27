import { NextFunction, Request, Response } from "express";

const parseJsonBody = (req: Request, res: Response, next: NextFunction) => {
  req.body = JSON.parse(req.body.data);
  return next();
};

export default parseJsonBody;
