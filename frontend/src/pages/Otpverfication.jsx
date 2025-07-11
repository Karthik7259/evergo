

import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Otpverfication = () => {

    const [data, setData] = useState([
        "", "", "", "", "", ""
    ]
    )



    const navigate = useNavigate();
    const inputRef=useRef([])
    const location=useLocation();

    console.log("location", location);

    useEffect(() => {

         if(!location?.state?.email){
            navigate('/forgot-password');
         }

    }, [])



    const valideValue = data.every(el => el)


    const handleSubmit = async (e) => {
        e.preventDefault();




        try {
            const response = await Axios({
                ...SummaryApi.verifyForgotPasswordOtp,
                data:{
                    otp: data.join(''),
                    email: location?.state?.email
                }

            })

            console.log("response", response);

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData(['', '', '', '', '', '']);

                  navigate('/reset-password',{
                    state:{
                       data: response.data,
                       email: location?.state?.email,
                    }
            })
            }

        } catch (err) {
            AxiosToastError(err);
        }



    }


    return (
        <section className=' w-full container mx-auto px-2 '>
            <div className='bg-white my-4 w-full max-w-lg mx-auto p-7 '>
                <p className='font-semibold text-lg' >OTP to reset your password</p>

                <form className='grid gap-4 py-6' onSubmit={handleSubmit} >

                    <div className='grid gap-1 '>
                        <label       htmlFor="otp">Enter Your OTP : </label>
                        <div

                         className='flex items-center gap-2 justify-between mt-3'

                         >
                            {
                                data.map((el, index) => {
                                    return <input
                                    key={"otp"+index}
                                        type='text'
                                        id='otp'
                                        ref={(ref)=>{
                                            inputRef.current[index]=ref
                                            return ref;
                                        }}
                                        maxLength={1}
                                        value={data[index]}
                                        onChange={(e)=>{
                                            const value=e.target.value;
                                            console.log("value", value);

                                        const newData=[...data];
                                        newData[index]=value;
                                        setData(newData);

                                        if(value && index <5){
                                            inputRef.current[index+1].focus();
                                        }


                                        }}
                                        className='bg-blue-50 w-full max-w-16 p-2 border rounded 
                                        outline-none
                                        focus:border-[#2296bf] text-center
                                        font-semibold
                                        '
                                    

                                    />
                                }
                                )
                            }

                        </div>

                    </div>
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 tracking-wide`}>
                        Verify otp
                    </button>
                </form>

                <p>
                    Already have account?<Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800 '>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Otpverfication


