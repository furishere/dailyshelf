import {z} from "zod"

export const journalSchema = z.object({
    heading : z
        .string()
        .min(3)
        .trim()
        .optional(),
    content : z
        .string()
        .min(1)
        .trim()
        .nonempty()
        .nonoptional()
})

export type JournalSchema = z.infer<typeof journalSchema>