import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.createFaculty
);

router.get("/:id", academicFacultyController.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  academicFacultyController.updateFaculty
);

router.delete("/:id", academicFacultyController.deleteFaculty);
router.get("/", academicFacultyController.getAllFaculties);

export const academicFacultyRoute = router;
