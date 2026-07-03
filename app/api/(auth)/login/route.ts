import { JWT_USER_SECRET } from "@/lib/config"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/validations/auth"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(
    req:Request
){
    try{
        const body = await req.json()

        const parsedBody = loginSchema.safeParse(body)
        
        if(!parsedBody.success){
            return Response.json({
            message : "invalid input",
            error : parsedBody.error.issues
            },{
                status : 400
            })
        }

        const {email, password} = parsedBody.data

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if(!user){
            return Response.json({
                message : "Invalid Credentials"
            },{
                status : 401
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return Response.json({
                message : "invalid credentials"
            },{
                status : 401
            })
        }

        const token = jwt.sign({
            userId:user.id
        },JWT_USER_SECRET!,{
            expiresIn : "30d"
        })

        const cookieStore = await cookies()

        cookieStore.set("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            maxAge : 60 * 60 * 24 * 30,
            path : "/"
        })

        return Response.json({
            message : "Login Successful",
            user : {
                id : user.id,
                username : user.username,
                email : user.email
            }
        },{
            status : 200
        })

    }catch(error){
        console.error(error)

        return Response.json({
            message : "internal server error"
        },{
            status : 500
        })
    }
}