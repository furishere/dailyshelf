import {z} from "zod"

export const mediaSchema = z.object({
    tmdbId:z.number().int().positive().optional(),
    googleBookId: z.string().trim().optional(),
    imdbId : z.string().trim().optional(),

    title: z.string().trim().min(1).max(200),
    originalTitle : z.string().trim().optional(),

    type : z.enum(["MOVIE","TV_SHOW","BOOK"]),

    description : z.string().optional(),

    poster : z.string().url().optional(),
    backdrop : z.string().url().optional(),

    releaseDate : z.coerce.date().optional(),

    releaseYear : z.number().int().optional(),

    genres : z.array(z.string()).default([]),

    language : z.string().optional(),

    runtime : z.number().int().positive().optional(),
    pages : z.number().int().positive().optional(),
    seasons : z.number().int().positive().optional(),
    episodes : z.number().int().positive().optional(),

    author : z.string().optional(),
    publisher : z.string().optional(),
    isbn : z.string().optional(),

    status : z
        .enum(["WATCHLIST","IN_PROGRESS","COMPLETED","DROPPED"])
        .default("WATCHLIST"),
    
    rating:z.number().int().min(1).max(5).optional(),

    favourite : z.boolean().default(false),

    review : z.string().optional(),

    notes : z.string().optional(),

    startedAt : z.coerce.date().optional(),

    finishedAt: z.coerce.date().optional()

})

export type MediaSchema = z.infer<typeof mediaSchema>