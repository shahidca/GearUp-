import { z } from "zod";

const registerValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters"),

  email: z.email("Invalid email address").toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),

  phone: z
    .string()
    .trim()
    .min(11, "Phone number is invalid")
    .max(20)
    .optional(),

  address: z
    .string()
    .trim()
    .max(255)
    .optional(),

  profileImage: z
    .url("Invalid image URL")
    .optional(),
});

const loginValidationSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
};