import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { mediaSchema } from "@/validations/media"

export async function POST(req:Request){
    const body = await req.json()

    const user = await getCurrentUser()
    if(!user){
        return Response.json({
            message : "unauthorized"
        },{
            status : 401
        })
    }

    const parsedBody = mediaSchema.safeParse(body)
    if(!parsedBody.success){
        return Response.json({
            message : "Invalid Input",
            error : parsedBody.error.issues
        },{
            status : 400
        })
    }

    const data = parsedBody.data

    const existingMedia = await prisma.media.findFirst({
        where : {
            userId : user.id,
            OR : [
              ...(data.tmdbId ? [{ tmdbId: data.tmdbId }] : []),
          ...(data.googleBookId
            ? [{ googleBookId: data.googleBookId }]
            : []),
          ...(data.imdbId ? [{ imdbId: data.imdbId }] : []),  
            ]
        }
    })

    if(existingMedia){
        return Response.json({
            message : "Media already exists in your library"
        },{
            status : 409
        })
    }
    
    const media = await prisma.media.create({
        data : {
            ...data,
            userId : user.id
        }
    })

    return Response.json({
        message : "Media added successfully",
        media
    },{
        status : 201
    })
}

export async function GET(){
    const user = await getCurrentUser()
    if(!user){
        return Response.json({
            message : "unauthorized"
        },{
            status : 401
        })
    }

    const media = await prisma.media.findMany({
        where : {
            userId : user.id
        }
    })

    return Response.json({
        media
    },{
        status : 200
    })
}