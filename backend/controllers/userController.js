import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body 
    if(!username || !email || !password){
        throw new Error("All fields are mandatory")
    }
    const userExists = await User.findOne({email});
    if (userExists) res.status(400).send("User already exists")
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({username,email,password:hashedPassword})

    try {
        await newUser.save()
        createToken(res, newUser._id);

        res.status(201).json({_id:newUser._id,username:newUser.username,email:newUser.email,isAdmin:newUser.isAdmin})
    } catch (error) {
        res.status(400)
        throw new Error("Invalid Data")
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const existingUser = await User.findOne({email})
    if (!existingUser){
        throw new Error("Email not found!!!")
    }
    if (existingUser){
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid){
            throw new Error("Invalid Password")
        }
        if(isPasswordValid){
            createToken(res,existingUser._id)
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email:existingUser.email,
                isAdmin:existingUser.isAdmin
            })
            return
        } 
    }
    else{
        console.error(error)
    }
})
 
const logoutCurrentUser = asyncHandler((req,res)=>{
    res.cookie('jwt',"",{
        httponly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Logged out Successfully"})
})
const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
})
const getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user){
        res.json({
            _id:user._id,
            username:user.username,
            email:user.email,
        })
    }
    else{
        res.status(404).json({message:"User not found"})
    }
})
const updateCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password){
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            user.password = hashedPassword
        }
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }
    else{
        res.status(404).json({message:"User not found"})
    }
})

const deleteUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        if(user.isAdmin){
            res.status(400).json({message:"Cannot delete admin user"})
        }
        else{
            await User.deleteOne({_id:user._id})
            res.json({message:"User deleted successfully"})
            }
    }
    else{
        res.status(404).json({message:"User not found"})
    }
})
const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error('User Not Found')
    }
    
})
const updateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)
        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error('User Not Found')
    }
})
export {createUser, loginUser, logoutCurrentUser, getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById}