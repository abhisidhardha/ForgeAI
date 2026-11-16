/** Client auth validation only; direct API callers do not pass through these Zod schemas. */
import { z } from "zod";

export const registerSchema = z
    .object({
        name: z.string().trim().min(1, "Name is required"),
        email: z.string().email("Must be in email format"),
        password: z.string().min(8, "Minimum password length is 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "Minimum password length is 8 characters"),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        },
    );

export const loginSchema = z.object({
    email: z.string().email("Must be in email format"),
    password: z.string().min(8, "Minimum password length is 8 characters"),
});
