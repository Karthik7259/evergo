import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showpassword, setShowPassword] = useState(false);
  
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
      // Add a loading toast that will be dismissed on success or error
      const loadingToastId = toast.loading('Logging in...');
      
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });
   
      console.log("response", response);
      
      // Dismiss the loading toast
      toast.dismiss(loadingToastId);
      
      if (response.data.error) {
        toast.error(response.data.message);
      } 

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accesstoken', response.data.data.accesstoken);
        localStorage.setItem('refreshtoken', response.data.data.refreshtoken);
        setData({
          email: "",
          password: "",
        });

        navigate('/');
      }
   
   }catch(err){
      // For network errors specifically
      if (err.message === 'Network Error' || !err.response) {
        toast.error('Cannot connect to server. Please check your internet connection or try again later.');
      } else {
        // For other errors, use the AxiosToastError helper
        AxiosToastError(err);
      }
   }

  

  }


  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto p-7 '>
        <p >Login to Continue</p>
          
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
          <div className='grid gap-1 '>
            <label htmlFor="password">Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#2296bf]'>
              <input
                type={showpassword ? 'text' : 'password'}
                id='password'
                className='w-full outline-none '
                name='password'

                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
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

            <Link to={'/forgot-password'} className='block ml-auto hover:text-[#2296bf]'>Forgot password</Link>
          </div>
          

          <button disabled={!valideValue}  className={` ${ valideValue ?  "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Login
          </button>
        </form>

          <p>
            Don't have account ?<Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800 '>register</Link>
          </p>
      </div>
    </section>
  )
}

export default Login

