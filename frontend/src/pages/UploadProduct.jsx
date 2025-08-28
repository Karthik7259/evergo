import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../../utils/Uploadimage'

import Loading from '../components/Loading'
import ViewImage from '../components/ViewImage'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import AddFieldComponent from '../components/AddFieldComponent'
import Axios from '../../utils/Axios'
import AxiosToastError from '../../utils/AxiosToastError'

import SummaryApi from '../../common/SummaryApi'
import successAlert from '../../utils/SuccessAlert'


const UploadProduct = () => {
  const [data,setData] = useState({
         name : "",
         image : [],
         category : [],
         subCategory:[],
         unit :"",
         stock : "",
         price : "",
         discount: "",
         description : "",
         more_details:{},

  })
 const [imageLoading, setImageLoading] = useState(false);
 const [ViewImageURL, setViewImageURL] = useState("");
 const allCategory=useSelector(state=>state.product.allCategory)

 const [selectCategory,setselectCategory] = useState("");
 const [selectSubCategory,setselectSubCategory] = useState("");
  const allSubCategory=useSelector(state=>state.product.allSubCategory)
   
   const [openAddFields, setOpenAddFields] = useState(false);
   const [FieldName,setFieldName] = useState("")


const handleChange=(e)=>{
  const {name,value} = e.target;
  setData((prevData)=>{return {
    ...prevData,
    [name]:value
  }})
}

const handleSubmit =async(e)=>{ 
  e.preventDefault();
  try {
    const response = await Axios({
      ...SummaryApi.createProduct,
      data:data
    })
  const {data:responseData} = response;

  if(responseData.success){
    successAlert(responseData.message)
    setData({
      name : "",
      image : [],
      category : [],
      subCategory:[],
      unit :"",
      stock : "",
      price : "",
      discount: "",
      description : "",
      more_details:{}
    })
   
  }
  

    console.log(response);
  } catch (error) {
    AxiosToastError(error)
  }
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



const handleRemoveCategory=async(index)=>{
  data.category.splice(index,1)
  setData((prevData)=>{
    return {
      ...prevData,
    }
  })
}

const handleRemoveSubCategory=async(index)=>{
  data.subCategory.splice(index,1)
  setData((prevData)=>{
    return {
      ...prevData,
      
    }
  })
}


const handleAddField=()=>{
  setData((prevData)=>{
    return {
      ...prevData,
      more_details: {...prevData.more_details, [FieldName]:""}
    }
  })

  setFieldName("")
  setOpenAddFields(false);
}

  return (
    <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Upload product </h2>
    </div>
    <div className='grid p-3 '>
        <form  className='grid gap-4' onSubmit={handleSubmit} >
          <div className='grid gap-1 '>
            <label htmlFor='name' className='font-medium'>Name</label>
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
            <label htmlFor='description' className='font-medium'>Description</label>
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
            <p className='font-medium'>Image</p>
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
                    data?.image?.map((img,index)=>{
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
             <label className='font-medium'>Category</label>
             <div>
              <select 
              className='bg-blue-50 border w-full p-2 rounded '
              value={selectCategory}
              onChange={(e)=>{
                const value=e.target.value;
                const category=allCategory.find(el=>el._id===value);
                console.log(category);

                setData((prevData)=>{
                  return {
                    ...prevData,
                    category:[...prevData.category, category]
                  }
                })

                 setselectCategory("");
              }}
              
              >
              <option value={""}>Select Category</option>
              {
                allCategory.map((c,index)=>{
                  return (
                    <option value={c?._id}>{c?.name}</option>
                  )
                })
              }
             </select>
 
    <div className='flex flex-wrap gap-3 '>
      {
       
    data.category.map((c,index)=>{
      return (
        <div key={c?._id+index+"product section"} className='text-sm flex items-center gap-1 bg-blue-50  mt-2  '>
          {console.log("datai ned 2",c)}
          <p>{c?.name}</p>
          <div className='hover:text-red-500 cursor-pointer ' onClick={()=>handleRemoveCategory(index)}>
              <IoClose size={20} className='' />
          </div>
        </div>
      )
    })
   }
    </div>








             </div>
          </div>


           <div className='grid  gap-1 '>
             <label className='font-medium'>SubCategory</label>
             <div>
              {/* <select 
              className='bg-blue-50 border w-full p-2 rounded '
              value={selectSubCategory}
              onChange={(e)=>{
                const value=e.target.value;
                const subCategory=allSubCategory.find(el=>el._id===value);
                console.log("test:",subCategory);

                setData((prevData)=>{
                  return {
                    ...prevData,
                    subCategory:[...prevData.subCategory, subCategory]
                  }
                })

                 setselectSubCategory("");
              }}
              >
              <option value={""}>Select Sub Category</option>
              {
                allSubCategory.map((c,index)=>{
                  return (
                    <option value={c?._id+index+"subcatgory section"} key={index}>{c?.name}</option>
                  )
                })
              }
             </select> */}
             <select 
  className="bg-blue-50 border w-full p-2 rounded"
  value={selectSubCategory}
  onChange={(e) => {
    const value = e.target.value;
    const subCategory = allSubCategory.find(el => el._id === value);
    console.log("test:", subCategory);

    if (subCategory) {
      setData((prevData) => ({
        ...prevData,
        subCategory: [...prevData.subCategory, subCategory],
      }));
    }

    setselectSubCategory("");
  }}
>
  <option value={""}>Select Sub Category</option>
  {allSubCategory.map((c, index) => (
    <option value={c?._id} key={index}>{c?.name}</option>
  ))}
</select>
 
    <div className='flex flex-wrap gap-3 '>
      {
    data.subCategory.map((c,index)=>{
      return (
        <div value={c._id+index+"subcatgory section"}  className='text-sm flex items-center gap-1 bg-blue-50  mt-2  '>
              {console.log("data in map:", c)}
          <p>{c.name}</p>
          <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
              <IoClose size={20} className='' />
          </div>
        </div>
      )
    })
   }
    </div>








             </div>
          </div>
         
         <div className='grid gap-1 '>
            <label htmlFor='unit' className='font-medium'>Unit</label>
            <input
            id='unit'
            type='text'
            placeholder='Enter product unit'
            name='unit'
            value={data.unit}
            onChange={handleChange}
            required
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded '
            />
          </div>


         <div className='grid gap-1 '>
            <label htmlFor='stock' className='font-medium'>Number of Stock</label>
            <input
            id='stock'
            type='number'
            placeholder='Enter product stock'
            name='stock'
            value={data.stock}
            onChange={handleChange}
            required
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded '
            />
          </div>
      
      <div className='grid gap-1 '>
            <label htmlFor='price'>Price</label>
            <input
            id='price'
            type='number'
            placeholder='Enter product price'
            name='price'
            value={data.price}
            onChange={handleChange}
            required
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded '
            />
          </div>


          <div className='grid gap-1 '>
            <label htmlFor='discount'>Discount</label>
            <input
            id='discount'
            type='number'
            placeholder='Enter product discount'
            name='discount'
            value={data.discount}
            onChange={handleChange}
            required
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded '
            />
          </div>
         
        {
          /* add more fields */
        }


        {
          Object?.keys(data?.more_details).map((k,index)=>{
               return(
                <div className='grid gap-1 '>
            <label htmlFor={k} className='font-medium' >{k}</label>
            <input
            id={k}
            type='text'
            placeholder={`Enter product ${k}`}
            value={data?.more_details[k]}
            onChange={(e)=>{
              const value = e.target.value;
              setData((prevData) => ({
                ...prevData,
                more_details: {
                  ...prevData.more_details,
                  [k]: value
                }
              }));
            }}   
            required
            className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded '
            />
          </div>
               )
          })
        }
       

          <div 
           onClick={() => setOpenAddFields(true)}
          className='inline-block  hover:bg-amber-300 bg-white  py-1 px-3  w-32  text-center font-semibold border border-amber-400 hover:text-neutral-900 cursor-pointer'>
            Add Fields 
            </div>
   

     <button className='bg-amber-200 hover:bg-amber-300 py-2 rounded font-semibold '>
      Submit
     </button>
  
        </form>
     </div>





{
  ViewImageURL && (
       <ViewImage url={ViewImageURL}
        Close={()=>setViewImageURL("")}
       />
  )
}

 {
  openAddFields && 
  (
    <AddFieldComponent
    
    value={FieldName}
    onChange={(e)=>{
      setFieldName(e.target.value)
    }}
       sumbit={handleAddField}
    close={() => setOpenAddFields(false)} 
    
    
    
    />
  )
 }





    </section>
  )
}

export default UploadProduct
