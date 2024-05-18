import { z } from "zod";
export const signUpValidation = z.object({
  fullName: z
    .string({ required_error: "Full Name cannot be empty" })
    .min(5, { message: "Min 5 characters" }),
  email: z
    .string({ required_error: "Email cannot be empty" })
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Password cannot be empty" })
    .min(8, { message: "Min 8 characters" })
    .max(38, { message: "Max 38 characters" }),
});

export const signInValidation = z.object({
  email: z
    .string({ required_error: "Email cannot be empty" })
    .email("Please enter a valid email"),
  password: z.string({ required_error: "Password cannot be empty" }),
});

export const newWorkspaceValidation = z.object({
  name: z
    .string({ required_error: "Workspace Name cannot be empty" })
    .min(5, { message: "Min 5 characters" })
    .max(20, { message: "Max 20 characters" }),
});
