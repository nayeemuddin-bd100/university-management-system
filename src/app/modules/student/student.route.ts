import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { studentController } from "./student.controller";
import { StudentValidation } from "./student.validation";

const router = express.Router();

router.get("/:id", studentController.getSingleStudent);
router.get("/", studentController.getAllStudents);

router.delete("/:id", studentController.deleteStudent);

router.patch(
  "/:id",
  validateRequest(StudentValidation.updateStudentZodSchema),
  studentController.updateStudent
);

export const studentRoute = router;
