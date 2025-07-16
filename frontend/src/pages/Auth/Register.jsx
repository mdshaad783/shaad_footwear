import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'


const Register = () => {
    const [username, setUserName] = useState("")
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

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else{
            try{
                const res = await register({username, email,password}).unwrap()
                dispatch(setCredientials({...res}))
                navigate(redirect)
                toast.success('User successfully registered')
            }catch(error){
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }
  return<section className='pl-[10rem] flex flex-wrap justify-center'>
    <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4 underline">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
                <label htmlFor="name" 
                className='block text-sm font-medium text-gray-700'>
                    Name
                </label>

                <input type="text" 
                id="name" 
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder='Enter your name' 
                value={username} 
                onChange={(e)=> setUserName(e.target.value)}/>
            </div>

            <div className="my-[2rem]">
                <label htmlFor="email" 
                className='block text-sm font-medium text-gray-700'>
                    E-mail
                </label>

                <input type="email" 
                id="email" 
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder='Enter E-mail' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="my-[2rem]">
                <label htmlFor="password" 
                className='block text-sm font-medium text-gray-700'>
                    Password
                </label>
                <input type="password" 
                id="password" 
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder='Enter your password' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <div className="my-[2rem]">
                <label htmlFor="confirmPassword" 
                className='block text-sm font-medium text-gray-700'>
                    Confirm Password
                </label>
                <input type="password" 
                id="confirmPassword" 
                className="mt-1 p-2 border border-gray-300 rounded w-full" 
                placeholder='Confirm Password' 
                value={confirmPassword} 
                onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </div>
            <button disabled={isLoading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Registering...":"Register"}</button>
            {isLoading && <Loader/>}
        </form>
        <div className="mt-4">
            <p>
                Already have an account? {" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-500 hover:text-blue-600 hover:underline">Login</Link>
            </p>
        </div>
    </div>
    {/* <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      /> */}
  </section>
  
}

export default Register