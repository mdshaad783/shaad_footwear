import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link,useLocation,useNavigate } from 'react-router'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
// import './Login.css'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, {isLoading}] = useLoginMutation()
  const {userInfo} = useSelector(state=>state.auth)
  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect')||'/'
  useEffect(() => {
  if(userInfo){
    navigate(redirect)
    }
    }, [navigate,redirect,userInfo])
    
  const submitHandler = async(e)=>{
    e.preventDefault()
    try{
      const res = await login({email,password}).unwrap()
      // console.log(res);
      dispatch(setCredientials({...res}))
    }
    catch(error){
      toast.error(error?.data?.message || error.message)
      }
  }
  return (
    <div>
      <section className='pl-[10rem] flex flex-wrap justify-center'>
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4 underline">Sign-In</h1>

          <form className='container w-[40rem]' onSubmit={submitHandler}>
            <div className="my-[2rem]">
              <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email Address</label>

              <input type="email" name="" id="email" placeholder='Enter your email' className='mt-1 p-2 border border-gray-300 rounded w-full' value={email} onChange={e=>setEmail(e.target.value)} />
            </div>

            <div className="mb-4">
              <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="" id="password" placeholder='Enter your password' className='mt-1 p-2 border border-gray-300 rounded w-full' value={password} onChange={e=>setPassword(e.target.value)} />
            </div>

            <button disabled={isLoading} type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
              {isLoading?"Signing In...":"Sign In"}
            </button>
            {isLoading && <Loader/>}
          </form>


          <div className="mt-4">
            <p>
              New Customer ? {" "}
              <Link to={redirect ? `/register?register=${redirect}`:'/register'} className='text-blue-500 hover:text-600 hover:underline'>Register</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login