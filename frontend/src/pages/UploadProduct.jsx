import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../../utils/Uploadimage'

import Loading from '../components/Loading'
import ViewImage from '../components/ViewImage'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'


const UploadProduct = () => {
  const [data,setData] = useState({
         name : "",
         image : [],
         category : [],
         subCategory:[],
         unit :[],
         stock : "",
         price : "",
         discount: "",
         description : "",
         more_details:{},

  })
 const [imageLoading, setImageLoading] = useState(false);
 const [ViewImageURL, setViewImageURL] = useState("");
 const allCategory=useSelector(state=>state.product.allCategory)

const handleChange=(e)=>{
  const {name,value} = e.target;
  setData((prevData)=>{return {
    ...prevData,
    [name]:value
  }})
}

const handleUploadImage=async(e)=>{
  const file=e.target.files[0];
  if(!file) return;


    setImageLoading(true);
   const response=await uploadImage(file);
   const {data : ImageResponse} = response;

   const imageUrl=ImageResponse.data.url

setData((prevData)=>{
  return {
    ...prevData,
    image: [...prevData.image, imageUrl]
  }
})

setImageLoading(false);
}


const handleDeleteImage=async(index)=>{
 data.image.splice(index,1)
 setData((prevData)=>{
   return {
     ...prevData,
     image: [...prevData.image]
   }
 })

}










  return (
    <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Upload product </h2>
    </div>
    <div className='grid p-3 '>
        <form  className='grid gap-2'>
          <div className='grid gap-1 '>
            <label htmlFor='name'>Name</label>
            <input
            id='name'
            type='text'
            placeholder='Enter product name'
            name='name'
            value={data.name}
            onChange={handleChange}
            required
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded '
            />
          </div>
          <div className='grid gap-1 '>
            <label htmlFor='description'>Description</label>
            <textarea
            id='description'
            placeholder='Enter product description'
            name='description'
            value={data.description}
            onChange={handleChange}
            required
            multiple
            rows={3}
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded resize-none'
            />
          </div>
          <div>
            <p>Image</p>
                <div>
                  <label htmlFor='productImage' className='bg-neutral-100 h-24 border rounded flex justify-center items-center cursor-pointer'>
                  <div className='text-center flex justify-center items-center flex-col'>
                    
                    {
                      imageLoading  ? <Loading/> : (
                        <>
                        <FaCloudUploadAlt
                     size={35}
                    />
                    <p>Upload Image</p>
                        </>
                      )
                    }
                    
                    
                  
                  </div>
                  <input type="file" id='productImage' 
                  className='hidden'
                  accept='image/*'
                  onChange={handleUploadImage}
                  name='productImage'
                  />
            </label>

                    {/*display uploaded images*/ }
                 <div className='flex flex-wrap gap-4  '
              >

                  {
                    data.image.map((img,index)=>{
                      return (
                        <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group '>
                          <img src={img} alt={`Uploaded Image ${index}`} 
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={()=>setViewImageURL(img)}
                          />
                          <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer' >
                            <MdDelete/>
                          </div>
                        </div>
                      )
                    })
                  }
                   
                 </div>


                  
                  </div>   
         

          </div>
          <div className='grid  gap-1 '>
             <label htmlFor="">Category</label>
             <div>
              <select 
              className='bg-blue-50 border w-full p-2 rounded '
              
              >
              <option value={""}>Select Category</option>
              {
                allCategory.map((c,index)=>{
                  return (
                    <option value={c._id}>{c.name}</option>
                  )
                })
              }
             </select>
             </div>
          </div>
        </form>
     </div>





{
  ViewImageURL && (
       <ViewImage url={ViewImageURL}
        Close={()=>setViewImageURL("")}
       />
  )
}







    </section>
  )
}

export default UploadProduct
