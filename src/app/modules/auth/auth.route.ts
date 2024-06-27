import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.loginZodSchema),
  authController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(authValidation.refreshTokenZodSchema),
  authController.refreshToken
);

router.patch(
  "/change-password",
  validateRequest(authValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  authController.changePassword
);

router.post(
  "/forget-password",
  validateRequest(authValidation.forgetPasswordZodSchema),
  authController.forgetPassword
);

router.post(
  "/reset-password",
  validateRequest(authValidation.resetPasswordZodSchema),
  authController.resetPassword
);

export const authRoute = router;
