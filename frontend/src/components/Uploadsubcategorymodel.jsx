import React ,{ useState } from 'react'
import { IoClose } from 'react-icons/io5';
import uploadImage from '../../utils/Uploadimage';
 
const UploadSubCategoryModel = ({close}) => {
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

  const handleUploadSubCategoryImage = async(e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }


     const Response = await uploadImage(file);

         const {data : ImageResponse} = Response;

          setSubCategoryData((prevData) => {
            return {
              ...prevData,
              image: ImageResponse.data.url
            };
          });


  }
     


  return (
   <section className=' fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex justify-center items-center'>
         <div 
         className='w-full max-w-5xl bg-white p-4  rounded  '
         >
        <div className='flex  items-center justify-between  gap-3 '>
            <h1 className='font-semibold'>Add Sub Category </h1>
               <button onClick={close}>
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
                               <img src={subCategoryData.image} alt="Subcategory" className='w-full h-full object-scale-down' />
                            )


                         }

                 </div>
                 <label htmlFor="uploadSubCategoryImage">
                  <div className='px-4 py-1 border 
                  border-amber-300  text-amber-400 rounded hover:bg-amber-300 hover:text-neutral-900 cursor-pointer '>
                  upload image
                 </div>
                 <input type="file" id="uploadSubCategoryImage"  className='hidden'
                  onChange={handleUploadSubCategoryImage}
                 />
                 </label>
                 
                 </div>
             </div>
                {/* <div className='grid gap-1 '> 
                       <label htmlFor="">Select Category</label>    
                       <select 
                       className='bg-blue-50 border p-3 
                        '
                       >
                        <option value={""}>Select Category</option>
                       </select>
                </div> */}
                <div className='grid gap-1 '>
                  <label htmlFor="">Select Category</label>
                   <div className='border focus-within:border-[#2296bf]  rounded  '>
                   {/* display value */}

           

                   {/* select category */}
                   <select
                   
                    className='w-full p-2 bg-transparent outline-none '
                   >
                     <option value={""} disabled >Select Category</option>

                   </select>
                 </div>
                </div> 
                 


         </form>
         </div>
    </section>
  )
}

export default UploadSubCategoryModel
