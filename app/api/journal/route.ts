import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { journalSchema } from "@/validations/journal";

export async function POST(req: Request){
    const body = await req.json()

    const user = await getCurrentUser()
    if(!user) {
        return Response.json({
            messagev: "unauthorized"
        },{
            status : 401
        })
    }

    const parsedBody = journalSchema.safeParse(body)
    
    if(!parsedBody.success){
        return Response.json({
            message : "Invalid Inputs",
            error : parsedBody.error.issues
        },{
            status : 400
        })
    }

    const {heading, content} = parsedBody.data

    const journal = await prisma.journal.create({
        data : {
            heading,
            content,
            userId : user.id
        }
    })

    return Response.json({
        message : "journal created successfully",
        journal
    },{
        status : 201
    })

}

export async function GET(req: Request){
    const user = await getCurrentUser()

    if(!user){
        return Response.json({
            message : "user not found"
        },{
            status : 404
        })
    }

    const allJournal = await prisma.journal.findMany({
         where : {
            userId : user.id
        },
        orderBy : {
            createdAt : "desc"
        }
    })

    return Response.json({
        allJournal
    },{
        status : 200
    })
}