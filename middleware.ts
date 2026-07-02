import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){
    const token = req.cookies.get("token")?.value
    if(!token){
        return NextResponse.json({
            message : "user unauthorized"
        },{
            status : 401
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher : [
        "/api/journal/:path"
    ]
}