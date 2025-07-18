import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

  const [data, setData] = useState({

    email: "",
    

  })

  
  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    });
  }

  const valideValue=Object.values(data).every(el=>el)


   const handleSubmit = async(e)=>{
    e.preventDefault();
   try{
    const response= await Axios({
      ...SummaryApi.forgotPassword,
      data: 
       data
      
    })
    console.log("response", response);
    if (response.data.error) {
      toast.error(response.data.message);
    } 
    if (response.data.success) {
      toast.success(response.data.message);
      navigate('/verifcation-otp',{
        state: data
      });
      setData({
        email: "",
      })
    }
   }catch(err){
      AxiosToastError(err);
   }

  

  }


  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto p-7 '>
        <p className='font-semibold text-lg ' >Enter email to reset your password</p>
          
        <form className='grid gap-4 py-6' onSubmit={handleSubmit} >
          
          <div className='grid gap-1 '>
            <label htmlFor="email">Email :</label>
            <input
              type='email'
              id='email'
              className='bg-blue-50 p-2 border rounded '
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>
          <button disabled={!valideValue}  className={` ${ valideValue ?  "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Send otp
          </button>
        </form>

          <p>
            Already have account?<Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800 '>Login</Link>
          </p>
      </div>
    </section>
  )
}

export default ForgotPassword

