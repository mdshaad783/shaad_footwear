import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { useDeleteUserMutation, useGetUsersQuery, useUpdatedUserMutation } from "../../redux/api/usersApiSlice"
import AdminMenu from "./AdminMenu"
import Message from "../../components/Message"


const UserList = () => {
    const {data:users, refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdatedUserMutation()
    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    const deleteHandler = async (id)=>{
        if(window.confirm("Are you sure?")){
            try{
                await deleteUser(id)
            }catch(error){
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = (id, username, email)=>{
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async(id)=>{
        try {
            await updateUser({
                userId : id,
                username : editableUserName,
                email:editableUserEmail
            })
            setEditableUserId(null)
            refetch()
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }
    useEffect(() => {
        refetch();
    }, [refetch])
  return (
    <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4 ms-[10rem]">Users</h1>
        {isLoading ? (<Loader/>): error?(<Message variant='danger'>{error?.data.message || error.message}</Message>):(
            <div className="flex flex-col md:flex-row">
                <AdminMenu/>
                <table className="w-full md:w-4/5 mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">NAME</th>
                            <th className="px-4 py-2 text-left">EMAIL</th>
                            <th className="px-4 py-2 text-left">ADMIN</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user=>(
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{user._id}</td>

                                    <td className="px-4 py-2">{editableUserId==user._id?(
                                        <div className="flex items-center">
                                            <input type="text" value={editableUserName} onChange={e=>setEditableUserName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg"/>
                                            <button onClick={()=> updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                <FaCheck/>
                                            </button>
                                        </div>
                                    ):(
                                        <div className="flex items-center">
                                            {user.username}{" "}
                                            <button onClick={()=> toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className="ml-[1rem]"/>
                                            </button>
                                        </div>
                                    )}</td>

                                    <td className="px-4 py-2">
                                        {editableUserId == user._id?(
                                            <div className="flex items-center">
                                                <input type="text" value={editableUserEmail} onChange={e=>setEditableUserEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                                                <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={()=> updateHandler(user._id)}>
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ):(
                                            <div className="flex items-center">
                                                <p>{user.email}</p>
                                                <button onClick={()=> toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className="ml-[1rem]"/>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    
                                    <td className="px-4 py-2"> 
                                        {user.isAdmin?(
                                            <FaCheck style={{color:'#3B82F6'}}/>
                                        ):(
                                            <FaTimes style={{color:"red"}}/>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button onClick={()=> deleteHandler(user._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    <FaTrash/>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            )}
    </div>
  )
}

export default UserList