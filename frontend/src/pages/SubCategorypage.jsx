import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/uploadSubCategoryModel'
import AxiosToastError from '../../utils/AxiosToastError';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from '@tanstack/react-table'
import ViewImage from '../components/ViewImage';

const SubCategorypage = () => {

 const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
 const [data,setData]=useState([])
 const [loading, setLoading] = useState(false);
 const [ImageUrl, setImageUrl] = useState("")


 const columnHelper=createColumnHelper();

 const fetchSubCategory = async()=>{
  try{
    setLoading(true);
     const response=await Axios({
      ...SummaryApi.getSubcategory

     })
      const {data : responseData} = response

      if(responseData.success){
        
        setData(responseData.data)
      }






  }catch(error){
    AxiosToastError(error)
  }finally{
    setLoading(false);
  }
 }


 useEffect(()=>{
   fetchSubCategory()
 },[])


 const column = [
     columnHelper.accessor('name',{
      header : "Name"
     }),
     columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        
        return <div className='flex justify-center items-center '>
           <img 
        src={row.original.image}
        alt={row.original.name}
        className='w-8 h-8 cursor-pointer'
        onClick={ () => {
          setImageUrl(row.original.image)
        }}
        />
        </div>
      }
     }),
   columnHelper.accessor("category",{
     header : "Category",

   })

     
 ]

 console.log("subcategory data", data)


  return (
    <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Sub Category</h2>
       <button onClick={ () => setOpenAddSubCategory(true)} className='text-sm border border-[#ece75f] hover:bg-[#e6cc00] px-3 py-1 rounded '>Add Sub Category</button>

    </div>

     <div>

  <DisplayTable 
  
  data={data}
  column={column}
  
  
  />

     </div>


{

  openAddSubCategory && (
      <UploadSubCategoryModel
       close={() => setOpenAddSubCategory(false)}
      
      />
  )

}

{
  ImageUrl && (
    <ViewImage url={ImageUrl} close={() => setImageUrl("")} />
  )
}






    </section>

  )
}

export default SubCategorypage
