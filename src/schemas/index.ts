import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(6, { message: "Password must be at least 6 characters!" })
    .max(16, { message: "password cannot exceed 16 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
