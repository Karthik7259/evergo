import React from 'react'
import { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import { updatedAvatar } from '../redux/userSlice'
import { IoClose } from 'react-icons/io5'



const UserProfileAvatarEdit = ({close}) => {
  const user=useSelector(state => state?.user)
  const dispatch = useDispatch();

  const [loading,setLoading]=useState(false);



  const  handleUploadAvatarImage = async (e)  =>{
    const file = e.target.files[0];
   
    if (!file) {
        console.log('No file selected');
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
    }

    const formData=new FormData();  
    formData.append('avatar',file);

    console.log('File selected:', file);
    console.log('FormData created:', formData);

    try{
        setLoading(true);
        const response=await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    const {data: reponseData} =response;
      dispatch(updatedAvatar(reponseData.data.avatar));
    }catch(error){     
        AxiosToastError(error);
    } finally{
        setLoading(false);
    }

  }

  
   const handleSubmit =(e) =>{
    e.preventDefault(); 
   }


  return (
   <section className='fixed top-0 bottom-0 left-0 right-0 p-4 flex items-center justify-center ' style={{ backgroundColor: 'rgba(23, 23, 23, 0.5)' }} >
   <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col
    items-center  justify-center  '>

          <button onClick={close}   className='text-neutral-800 w-fit block ml-auto '>
            <IoClose/>
          </button>

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

                
            <form onSubmit={handleSubmit} >
                 <label htmlFor='uploadProfile'>
                    <div className='border border-amber-400 cursor-pointer  hover:bg-yellow-300 px-4 py-1 rounded text-sm my-3 '>
                 
                    {
                        loading  ?  "Loading..." : "Upload"
                    }
                        </div>
                    </label>
                    <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile' className='hidden' />
                  </form>
   </div>
   </section>

  )
}

export default UserProfileAvatarEdit
