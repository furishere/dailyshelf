export const JWT_USER_SECRET = process.env.JWT_USER_SECRET
if(!JWT_USER_SECRET){
    throw new Error("jwt secret is missing")
}