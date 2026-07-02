import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { journalSchema } from "@/validations/journal"

async function getUserHelper(userId: string, journalId : string){
    return prisma.journal.findFirst({
        where : {
            id:journalId,
            userId,
        }
    })
}

export async function PATCH(
    req:Request,
    {params} : {
        params : Promise<{journalId :string}>
    }
){
    const {journalId} = await params

    const body = await req.json()

    const user = await getCurrentUser()
    if(!user) {
        return Response.json({
            message : "unauthorized"
        },{
            status : 401
        })
    }
    
    const journal = await getUserHelper(user.id, journalId)

    if(!journal){
        return Response.json({
            message : "journal not found"
        },{
            status : 404
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

    const updateJournal = await prisma.journal.update({
        where : {
            id : journalId
        },data :{
            heading,
            content
        }
    })

    return Response.json({
        message : "updated successfully",
        updateJournal
    },{
        status :200
    })

}

export async function DELETE(
    req:Request,
    {params} : {
        params : Promise<{journalId : string}>
    }
){
    const {journalId} = await params

    const user = await getCurrentUser()
    if(!user) {
        return Response.json({
            message : "unauthorized"
        },{
            status : 401
        })
    }
    
    const journal = await getUserHelper(user.id, journalId)

    if(!journal){
        return Response.json({
            message : "journal not found"
        },{
            status : 404
        })
    }

    await prisma.journal.delete({
        where : {
            id: journalId
        }
    })

    return Response.json({
        message : "journal deleted successfully"
    },{
        status : 200
    })

}

export async function GET(
    req:Request,
    {params} : {
        params : Promise<{journalId:string}>
    }
){
    const {journalId} = await params

    const user = await getCurrentUser()
    if(!user){
        return Response.json({
            message : "unauthorized"
        },{
            status : 401
        })
    }

    const journal = await getUserHelper(user.id, journalId)

    if(!journal){
        return Response.json({
            message : "journal not found"
        },{
            status : 404
        })
    }

    return Response.json({
        journal
    },{
        status : 200
    })
}