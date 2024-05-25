import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.loginZodSchema),
  authController.loginUser
);

export const authRoute = router;
