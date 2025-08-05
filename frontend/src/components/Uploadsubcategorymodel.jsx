import React ,{ useState } from 'react'
import { IoClose } from 'react-icons/io5';
 
const UploadSubCategoryModel = () => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    image: '',
    category : []
  });



  const handleChange = (e) => {   
    const { name, value } = e.target;
     setSubCategoryData((prev)=>{
      return {
        ...prev,
        [name]: value
      }
     })
  }

  return (
   <section className=' fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex justify-center items-center'>
         <div 
         className='w-full max-w-5xl bg-white p-4  rounded  '
         >
        <div className='flex  items-center justify-between  gap-3 '>
            <h1 className='font-semibold'>Add Sub Category </h1>
               <button>
                     <IoClose size={25}/>

               </button>


        </div>

         <form className='my-3' >
             

   <div className='grid gap-1 '>
                <label htmlFor="name"> Name</label>
                <input 
                 id='name'
                 value={subCategoryData.name}
                 onChange={handleChange}
                className='p-3 bg-blue-50 outline-none focus-within:border-[#2296bf]    ' />
              </div>
             <div className='grid gap-1 '>
                <p>image</p>
                 <div className='flex flex-col lg:flex-row  items-center gap-3 '>
                   <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                         {
                            !subCategoryData.image ? (
                              <p className='text-sm text-neutral-500'>No image selected</p>
                            ) : (
                              <img src={subCategoryData.image} alt="Sub Category" className='w-full h-full object-cover' /> 
                            )


                         }

                 </div>
                 <button className='px-4 py-1 border
                  border-amber-100 text-amber-200 hover:bg-primary-200 hover:text-neutral-900'>
                  upload image
                 </button>
                 </div>
             </div>

         </form>


         </div>

    </section>
  )
}

export default UploadSubCategoryModel
