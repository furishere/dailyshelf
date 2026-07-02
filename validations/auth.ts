import {z} from "zod"

export const registerSchema = z.object({
    username : z
        .string()
        .min(1)
        .max(30)
        .trim(),
    email : z
        .string()
        .email()
        .trim(),
    password : z
        .string()
        .trim()
        .min(8)
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email : z
        .string()
        .email()
        .min(8),
    password : z
        .string()
        .min(8)
        .trim()
})

export type LoginSchema = z.infer<typeof loginSchema>