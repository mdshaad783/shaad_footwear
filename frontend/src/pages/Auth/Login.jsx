import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link,useLocation,useNavigate } from 'react-router'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loader from '../../components/Loader'


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
      console.log(res);
      dispatch(setCredientials({...res}))
    }
    catch(error){
      toast.error(error?.data?.message || error.message)
      }
  }
  return (
    <div>
      <section className='pl-[10rem] flex flex-wrap'>
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="registerHeading">Sign-In</h1>
          <form className='container w-[40rem]' onSubmit={submitHandler}>
            <div className="formElement">
              <label htmlFor='email' className="formLabel">Email Address</label>
              <input type="email" name="" id="email" className='formInput' value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="formElement">
              <label htmlFor='password' className="formLabel">Password</label>
              <input type="password" name="" id="password" className='formInput' value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>{isLoading?"Signing In...":"Sign In"}</button>
            {isLoading && <Loader/>}
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer ? {" "}
              <Link to={redirect ? `/register?register=${redirect}`:'/register'} className='text-pink-500 hover:underline'>Register</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login