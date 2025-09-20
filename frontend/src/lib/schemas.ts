import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be 6+ chars"),
    confirmPassword: z.string().min(6, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type SignupData = z.infer<typeof signupSchema>
