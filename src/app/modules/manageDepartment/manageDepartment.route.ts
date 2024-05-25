import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { manageDepartmentController } from "./manageDepartment.controller";
import { manageDepartmentValidation } from "./manageDepartment.validation";
const router = express.Router();

router.post(
  "/create-department",
  validateRequest(manageDepartmentValidation.createManageDepartmentZodSchema),
  manageDepartmentController.createDepartment
);

router.get("/:id", manageDepartmentController.getSingleDepartment);

router.patch(
  "/:id",
  validateRequest(manageDepartmentValidation.updateManageDepartmentZodSchema),
  manageDepartmentController.updateDepartment
);

router.delete("/:id", manageDepartmentController.deleteDepartment);

router.get("/", manageDepartmentController.getAllDepartments);

export const managementDepartmentRoute = router;
