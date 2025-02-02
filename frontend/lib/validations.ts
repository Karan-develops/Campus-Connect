import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select a gender",
  }),
  address: z.string().min(10, "Address must be at least 10 characters"),
  program: z.string({
    required_error: "Please select a program",
  }),
  previousSchool: z
    .string()
    .min(2, "Previous school name must be at least 2 characters"),
  gpa: z
    .string()
    .refine(
      (val) =>
        !isNaN(Number.parseFloat(val)) &&
        Number.parseFloat(val) >= 0 &&
        Number.parseFloat(val) <= 4,
      {
        message: "GPA must be a number between 0 and 4",
      }
    ),
  essay: z
    .string()
    .min(25, "Essay must be at least 25 characters")
    .max(100, "Essay must not exceed 100 characters"),
});
