import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import './Navigation.css'
import { useSelector,useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice.js'
import { logout } from '../../redux/features/auth/authSlice.js'

const Navigation = () => {
  const {userInfo} = useSelector(state=>state.auth)
  const [dropdownOpen,setDropdownOpen] = useState(false)
  const [showSidebar,setShowSidebar] = useState(false)

  const toggleDropdown=()=>{
    setDropdownOpen(!dropdownOpen)
  }
  const toggleshowSidebar=()=>{
    setShowSidebar(!showSidebar)
  }
  const closeSidebar=()=>{
    setShowSidebar(false)
  }
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async()=>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login")
    }catch(error){
        console.error(error);
      }
    }
  
  return (
    <div style={{zIndex:999}} className={`${showSidebar ? "hidden" : 'flex' }`} id='navigation-container'>
      <div className='mainContainer'>
        <Link to='/' className='flex-container'>
          <AiOutlineHome className='icon' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{}
        </Link>

        <Link to='/shop' className='flex-container'>
          <AiOutlineShopping className='icon' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{}
        </Link>

        <Link to='/cart' className='flex-container'>
          <AiOutlineShoppingCart className='icon' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{}
        </Link>

        <Link to='/favourite' className='flex-container'>
          <FaHeart className='icon' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">FAVOURITE</span>{}
        </Link>
      </div>

      <div className="nav_username">
        <button className="username_button" onClick={toggleDropdown}>
          {userInfo ? <span className="text-white bg-none">{userInfo.username}</span>:(<></>)}
          {userInfo && (
            <svg 
            width="15" height="15"
            xmlns = "http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 ${
              dropdownOpen ? "" : "transform rotate-180"}`} fill="none" 
              viewBox="0 0 24 24" 
              stroke="white"
          >
            <path 
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15":"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"}
            />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo &&(
          <ul className={`username_dropdownbox ${!userInfo.isAdmin ? 'admin_userbox':"normal_userbox"}`}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to='/admin/dashboard' className='username_links'>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/admin/productlist' className='username_links'>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to='/admin/categorylist' className='username_links'>
                    Category
                  </Link>
                </li>
                <li>
                  <Link to='/admin/orderlist' className='username_links'>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to='/admin/userlist' className='username_links'>
                    Users
                  </Link>
                </li>
                
              </>
            )}
            <li>
                  <Link to='/admin/profile' className='username_links'>
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className='logout_link'>
                    Logout
                  </button>
                </li>
          </ul>
        )}
      </div>
        {!userInfo && (
      <ul className="list-none">
        <li>
        <Link to='/login' className='flex-container'>
          <AiOutlineLogin className='icon' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">Login</span>{}
        </Link>
        </li>

        <li>
        <Link to='/register' className='flex-container register'>
          <AiOutlineUserAdd className='icon' size={26}/>
          <span className="hidden nav-item-name mt-[3rem]">Register</span>{}
        </Link>
        </li>

      </ul>
        )}
    </div>
  )
}

export default Navigation