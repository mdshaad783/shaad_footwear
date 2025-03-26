import jwt, { decode } from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorised,token failed...")   
        }
    }
    else{
        res.status(401)
        throw new Error("Not authorised, no token...")
    }
})

const authorizeAdmin = (req,res,next)=>{
    if (req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(403).send("Not an Admin")
    }
}
export {authenticate, authorizeAdmin}