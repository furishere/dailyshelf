import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/validations/auth"
import bcrypt from "bcrypt"

export async function POST(
    req:Request
){
    try{
    const body = await req.json()

    const parsedBody = registerSchema.safeParse(body)
    if(!parsedBody.success){
        return Response.json({
            message : "invalid input",
            error : parsedBody.error.issues
        },{
            status : 400
        })
    }
    const {username, email, password} = parsedBody.data

    const existingUser = await prisma.user.findFirst({
        where : {
            OR : [
                {email},
                {username}
            ]
        }
    })
    if(existingUser?.username === username && existingUser.email === email){
        return Response.json({
            message : "user already exists"
        },{
            status : 409
        })
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = await prisma.user.create({
        data : {
            username,
            email,
            password: hashPassword
        }
    })

    return Response.json({
        message : "user created sucessfully",
        newUser : {
            id : newUser.id,
            username : newUser.username,
            email : newUser.email
        }
    },{
        status : 201
    })


    } catch(e){
        console.error(e)

        return Response.json({
            message : "internal server error"
        },{
            status : 500
        })
    }
}