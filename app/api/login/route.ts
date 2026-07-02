import { JWT_USER_SECRET } from "@/lib/config"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/validations/auth"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
            }, 
        })

        if(!user){
            return Response.json({
                message : "user not exists"
            },{
                status : 401
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return Response.json({
                message : "invalid credentials"
            },{
                status : 401
            })
        }

        const token = jwt.sign({
            id:user.id
        },JWT_USER_SECRET!,{
            expiresIn : "30d"
        })

        const response =  Response.json({
            message : "Login Sucessfull",
            user : {
                id : user.id,
                username : user.username,
                email : user.email
            }
        },{
            status : 200
        })

        response.headers.append(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Lax`
        )

        return response

    }catch(error){
        console.error(error)

        return Response.json({
            message : "internal server error"
        },{
            status : 500
        })
    }
}