import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation,useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'
import './Register.css'
const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state=>state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
        }, [ navigate, redirect,userInfo])

  return (
  <section className='pl-[10rem] flex flex-wrap'>
    <div className="mr-[4rem] mt-[5rem]">
        <h1 className="registerHeading">Register</h1>
        <form className="formContainer">
            <div className="formElement">
                <label htmlFor="name" 
                className='formLabel'>Name</label>
                <input type="text" 
                id="name" 
                className='formInput' 
                placeholder='Enter name' 
                value={username} 
                onChange={(e)=> setUserName(e.target.value)}/>
            </div>
            <div className="formElement">
                <label htmlFor="email" 
                className='formLabel'>E-mail</label>
                <input type="email" 
                id="email" 
                className='formInput' 
                placeholder='Enter E-mail' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="formElement">
                <label htmlFor="password" 
                className='formLabel'>Password</label>
                <input type="password" 
                id="password" 
                className='formInput' 
                placeholder='Enter your password' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="formElement">
                <label htmlFor="confirmPassword" 
                className='formLabel'>Confirm Password</label>
                <input type="password" 
                id="confirmPassword" 
                className='formInput' 
                placeholder='Confirm Password' 
                value={confirmPassword} 
                onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </div>
        </form>
    </div>
  </section>
  )
}

export default Register