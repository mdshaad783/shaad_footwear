import jwt, { decode } from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async(req,res,next)=>{
    let token;
    // 1. Check Authorization header
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Else fallback to cookie
  else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

   if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token...");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorised, token failed...");
  }
});
const authorizeAdmin = (req,res,next)=>{
    if (req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(403).send("Not an Admin")
    }
}
export {authenticate, authorizeAdmin}