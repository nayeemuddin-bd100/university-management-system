import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(UserValidation.createStudentZodSchema),
  userController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(UserValidation.createFacultyZodSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(UserValidation.createAdminZodSchema),
  userController.createAdmin
);

router.get(
  "/me",
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  userController.getMe
);

export const userRoute = router;
