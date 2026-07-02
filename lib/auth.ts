import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { JWT_USER_SECRET } from "./config"
import { prisma } from "./prisma"

interface JWTPayload {
    userId : string
}

export async function getCurrentUser(){
    const cookieStore = await cookies()

    const token =  cookieStore.get("token")?.value
    if(!token){
        throw new Error("token not found")
    }

    const decodejwt = jwt.verify(token, JWT_USER_SECRET!) as JWTPayload

    const userId = decodejwt.userId

    const user = await prisma.user.findUnique({
        where : {
            id : userId
        }, select : {
            id : true,
            username  : true,
            email : true
        }
    })

    if(!user){
        throw new Error ("user not found")
    }

    return user
}