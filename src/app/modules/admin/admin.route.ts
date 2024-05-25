import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = express.Router();

router.get("/:id", adminController.getSingleAdmin);
router.get("/", adminController.getAllAdmins);

router.delete("/:id", adminController.deleteAdmin);

router.patch(
  "/:id",
  validateRequest(adminValidation.updateAdmin),
  adminController.updateAdmin
);

export const adminRoute = router;
