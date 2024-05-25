import { z } from "zod";

const createManageDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
  }),
});

const updateManageDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
  }),
});

export const manageDepartmentValidation = {
  createManageDepartmentZodSchema,
  updateManageDepartmentZodSchema,
};
