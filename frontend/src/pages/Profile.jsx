import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import  {FaRegUserCircle} from 'react-icons/fa'
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import { useState } from 'react'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import toast from 'react-hot-toast'
import { setUserDetails } from '../redux/userSlice'
import fetchUserDetails from '../../utils/fetchUserDetails'

const Profile = () => {
  const user=useSelector((state)=>state?.user)
  const [openProfileAvatarEdit,setProfileAvatarEdit]=useState(false);
  const [userData,setUserData]=useState({
    name: user.name,
    email: user.email ,
    mobile: user.mobile,
  });

  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();

     useEffect(()=>{
      setUserData({
        name: user.name,
        email: user.email,
        mobile: user.mobile
      });
     },[user])

  console.log(user)
 const handleOnchange =(e)=>{
  const {name,value}=e.target;
  
  setUserData((prevData)=>{
    return {
        ...prevData,
        [name]: value
    }
  })


 }


 const  handleSubmit = async (e) => {
  e.preventDefault();


  try{
    setLoading(true);
    const response = await Axios({
      ...SummaryApi.updateUserDetails,
      data: userData
    });


    const {data: responseData} = response;

    if(responseData.success){
      toast.success(responseData.message);
       const userData = await fetchUserDetails();
            if (userData?.data) {
              dispatch(setUserDetails(userData.data));
            }
      // Optionally, you can update the user state in Redux or local storage here
    } else {
      toast.error(response.data.message);
    }
  }catch(error){
    AxiosToastError(error);
  }finally{
    setLoading(false);
  }

 }










  return (
    <div>


   {/** profile upload and display image */}

      <div className='w-20 h-20  bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar? 
          (
            <img 
             alt={user.name}
             src={user.avatar}
             className='w-full h-full'
            />
          ) : (
             <FaRegUserCircle size={65}/>
          )
        }
        

      </div>
  <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-[#2296bf] hover:border-[#2296bf]  hover:bg-amber-300 px-3 py-1 rounded-full mt-3 '>Edit</button>

     


   {
    openProfileAvatarEdit && (
      <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)} />
    )
   }

   {/** name,mobile,email,change password */}

  <form className='my-4 grid gap-4  ' onSubmit={handleSubmit}>
    <div className='grid '>
 <label >
   Name
 </label>
 <input
  type='text' 
 placeholder='Enter your name' 
  className='p-2 bg-blue-50 outline-none border focus-within:border-amber-200 rounded '
   value={userData.name}
   name="name"
   onChange={ handleOnchange}
   required
 />
    </div> 
 
 <div className='grid '>
 <label htmlFor='email'>
   Email
 </label>
 <input
  type='email' 
 placeholder='Enter your Email' 
  className='p-2 bg-blue-50 outline-none border focus-within:border-amber-200 rounded '
   value={userData.email}
   name="email"
   onChange={ handleOnchange}
   required
 />
    </div> 

    <div className='grid '>
 <label htmlFor='mobile'> 
   Mobile
 </label>
 <input
  type='number' 
  id='mobile'
 placeholder='Enter your Phone Number' 
  className='p-2 bg-blue-50 outline-none border focus-within:border-amber-200 rounded '
   value={userData.mobile}
   name="mobile"
   onChange={ handleOnchange}
   required
 />
    </div> 


<button className='border px-4 py-2 font-semibold hover:bg-amber-300  border-[#2296bf] hover:text-neutral-800'>


  {
    loading ? "Loading..." : "Submit"
  }



</button>


  </form>


    </div>
  )
}

export default Profile
