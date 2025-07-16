import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";


const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu=()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
        <button className={`${isMenuOpen? "top-2 right-2" : "top-5 right-7"} bg-blue-500 p-2 fixed rounded-lg`} onClick={toggleMenu}>
            {isMenuOpen? (
                <FaTimes color="white"/>
            ):(
                <>
                    <div className="w-6 h-0.5 bg-white my-1 "></div>
                    <div className="w-6 h-0.5 bg-white my-1 "></div>
                    <div className="w-6 h-0.5 bg-white my-1 "></div>
                </>
            )}
        </button>
        {isMenuOpen && (
            <section className="bg-white border border-gray-200 text-gray-900 p-4 fixed right-7 top-5">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm" to='/admin/dashboard' style={({isActive})=>({
                            color: isActive? "#2563EB":"#111827"
                        })}>Admin Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm" to='/admin/categorylist' style={({isActive})=>({
                            color: isActive? "#2563EB":"#111827"
                        })}>Create Category</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm" to='/admin/productlist' style={({isActive})=>({
                            color: isActive? "#2563EB":"#111827"
                        })}>Create Product</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm" to='/admin/allproductslist' style={({isActive})=>({
                            color: isActive? "#2563EB":"#111827"
                        })}>All Products</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm" to='/admin/userlist' style={({isActive})=>({
                            color: isActive? "#2563EB":"#111827"
                        })}>Manage Users</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-gray-200 rounded-sm" to='/admin/orderlist' style={({isActive})=>({
                            color: isActive? "#2563EB":"#111827"
                        })}>Manage Order</NavLink>
                    </li>
                </ul>
            </section>
            

        )}
    </>
  )
}

export default AdminMenu