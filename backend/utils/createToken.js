import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {expiresIn:"30d"})

    // Set jwt as an HTTP-Only cookie  
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite:'none',
        maxAge:30*24*60*60*1000
    }) 
    return token;
}
export default generateToken;