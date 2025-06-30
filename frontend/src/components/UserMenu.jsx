import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Divider from './Divider'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import { logout } from '../redux/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../../utils/AxiosToastError'

const UserMenu = ({close}) => {
    const user =useSelector((state) => state?.user)
    const dispatch=useDispatch()
    const navigate = useNavigate();

    const handleLogout = async () => {
       try{
        const response =await Axios({
         ...SummaryApi.logout,

        })

        if(response.data.success){
          if(close){
            close();
          }
             dispatch(logout())
             localStorage.clear();
            toast.success(response.data.message)
             navigate('/') // Redirect to login page after logout

        }


       }catch(error){
           AxiosToastError(error)
       }
    }
  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm'>{user.name || user.mobile}</div>

      <Divider/>

      
      <div className='text-sm grid gap-1'>
        <Link to={""} className="px-2  hover:bg-orange-200 py-1" >My Orders</Link>
        <Link to={""}  className="px-2 hover:bg-orange-200 py-1 " >Save Address</Link>
        <button onClick={handleLogout} className='text-left px-2 hover:bg-red-200 py-1'> Logout </button>
      </div>
    </div>
  )
}

export default UserMenu
