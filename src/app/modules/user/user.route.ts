import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(UserValidation.createStudentZodSchema),
  userController.createStudent
);

export const userRoute = router;
