import express, { NextFunction, Request, Response } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { upload } from "../../../shared/uploadImgToCloudinary";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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
