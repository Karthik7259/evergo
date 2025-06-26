import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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


   const handleSubmit =(e)=>{
    e.preventDefault();

          
   }

  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto p-7 '>
        <p >Welcome to Evergo</p>

        <form className='grid gap-4 mt-6' >

          <div className='grid gap-1 '>
            <label htmlFor="name">Name :</label>
            <input
              type='text'
              id='name'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-[#2296bf] '
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>
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
          </div>
          <div className='grid gap-1 '>
            <label htmlFor="confirmPassword">confirmPassword :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#2296bf]'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='w-full outline-none '
                name='confirmPassword'

                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter your confirmPassword'
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

          <button className={` ${ valideValue ?  "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
            Register
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register
