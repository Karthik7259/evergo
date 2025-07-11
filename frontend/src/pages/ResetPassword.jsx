import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate,Link } from 'react-router-dom'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import toast from 'react-hot-toast'
const ResetPassword = () => {
  
  const location=useLocation()
  const navigate=useNavigate()
  const [data,setData]= useState({
    email:"",
    newPassword:"",
    confirmPassword:""
  })

  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const valideValue=Object.values(data).every(el=>el)

  


  useEffect(()=>{
      if(!(location?.state?.data?.success)){
         navigate('/')
      }

      if(location?.state?.email){
          setData((prevData)=>{
          return {
            ...prevData,
            email:location?.state?.email
          }
          }
            )
      }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    });
  }

  const handleSubmit = async(e)=>{
      e.preventDefault();

   if(data.newPassword !== data.confirmPassword) {
      toast.error("Password and confirm password must be same");
        return;
    }



     try{
      const response= await Axios({
        ...SummaryApi.resetPassword,
        data: 
         data
        
      })
      console.log("response", response);
      if (response.data.error) {
        toast.error(response.data.message);
      } 
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login')
        setData({
          email: "",
          newPassword:"",
          confirmPassword:""
        })
      }
     }catch(err){
        AxiosToastError(err);
     }
  
    
  
    }




  
  
    return (

        <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto p-7 '>
        <p className='font-semibold text-lg ' >Enter your new password</p>
          
        <form className='grid gap-4 py-6' onSubmit={handleSubmit} >
          
          <div className='grid gap-1 '>
            <label htmlFor="NewPassword">New Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#2296bf]'>
                          <input
                            type={showpassword ? 'text' : 'password'}
                            id='password'
                            className='w-full outline-none '
                            name='newPassword'
            
                            value={data.newPassword}
                            onChange={handleChange}
                            placeholder='Enter your new Password'
                          />
                          <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer' >
                            {
                              showpassword ? (
                                <FaRegEye />
                              ) : (
                                <FaRegEyeSlash />
                              )
                            }
            
                         
                        </div>
                      </div>
          </div>

          <div className='grid gap-1 '>
            <label htmlFor="ConfirmPassword">confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#2296bf]'>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='password'
                            className='w-full outline-none '
                            name='confirmPassword'
            
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder='Enter your confirm Password'
                          />
                          <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer' >
                            {
                              showConfirmPassword ? (
                                <FaRegEye />
                              ) : (
                                <FaRegEyeSlash />
                              )
                            }
            
                         
                        </div>
                      </div>
          </div>
          <button disabled={!valideValue}  className={` ${ valideValue ?  "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Change Password
          </button>
        </form>

          <p>
            Already have account?<Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800 '>Login</Link>
          </p>
      </div>
    </section>
  )
}

export default ResetPassword
