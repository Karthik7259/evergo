import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import uploadImage from '../../utils/Uploadimage';
import { useSelector } from 'react-redux';


const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    image: '',
    category: []
  });


  const allCategory = useSelector((state) => state.product.allCategory);

  console.log("allCategory", allCategory);

  const handleChange = (e) => {
    console.log("e value",e.target.value);
    const { name, value } = e.target;
    console.log("name",name);
    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }


    const Response = await uploadImage(file);

    const { data: ImageResponse } = Response;

    setSubCategoryData((prevData) => {
      return {
        ...prevData,
        image: ImageResponse.data.url
      };
    });


  }

  const handleRemoveCategorySelected =(id) => {
    const index=subCategoryData.category.findIndex(el => el._id === id);
    subCategoryData.category.splice(index,1)
   setSubCategoryData((prevData)=>{
    return {
      ...prevData,

    }
   })
  }

  const handleSubmitSubCategory = async (e) => {
    try{

    }catch(error){
    }}





  return (
    <section className=' fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex justify-center items-center'>
      <div
        className='w-full max-w-5xl bg-white p-4  rounded  '
      >
        <div className='flex  items-center justify-between  gap-3 '>
          <h1 className='font-semibold'>Add Sub Category </h1>
          <button onClick={close}>
            <IoClose  size={25} />

          </button>


        </div>

        <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory} >


          <div className='grid gap-1 '>
            <label htmlFor="name">Name</label>
            <input
              id='name'
              name='name'
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
                <input type="file" id="uploadSubCategoryImage" className='hidden'
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
              <div className='flex flex-wrap gap-2 '>
                {
                  subCategoryData.category.map((cat, index) => {
                    return (
                      <p key={cat._id + "selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2   '>
                        
                        {cat.name}
                        <div className='cursor-pointer  hover:text-red-600 ' onClick={()=>(handleRemoveCategorySelected(cat._id))} >
                                <IoClose size={20} />
                        </div>
                      </p>
                    )
                  })
                }
              </div>


              {/* select category */}
              <select

                className='w-full p-2 bg-transparent outline-none  broder '
                onChange={(e) => {
                  const value = e.target.value;
                  const categorydetails = allCategory.find(el => el._id == value);
                  {
                    setSubCategoryData((prevData) => {
                      return {
                        ...prevData,
                        category: [...prevData.category, categorydetails]
                      };
                    });
                  }
                }}
              >
                <option value={""} disabled >Select Category</option>
                {
                  allCategory.map((category) => (
                    <option key={category._id + "subCategory"} value={category?._id}>
                      {category?.name}
                    </option>
                  ))
                }

              </select>
            </div>
          </div>



      <button
      className={` px-4 py-2 border  
         ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-amber-400 hover:bg-amber-300" : "bg-gray-200"}
         font-semibold

        `}
      >
        Submit
      </button>

 
        </form>
      </div>
    </section>
  )
}

export default UploadSubCategoryModel
