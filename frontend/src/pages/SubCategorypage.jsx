import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/uploadSubCategoryModel'
import AxiosToastError from '../../utils/AxiosToastError';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from '@tanstack/react-table'
import ViewImage from '../components/ViewImage';
import { HiPencil } from 'react-icons/hi';
import {MdDelete} from 'react-icons/md'
import EditSubCategory from '../components/EditSubCategory';
import CofirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';

const SubCategorypage = () => {

 const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
 const [data,setData]=useState([])
 const [loading, setLoading] = useState(false);
 const [ImageUrl, setImageUrl] = useState("")
 const [openEdit, setOpenEdit] = useState(false)
 const [editData, setEditData] = useState({
  _id : "",
 })

 const [deleteSubCategory, setDeleteSubCategory] = useState({
   _id:""
 })

 const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)



const handleDeleteSubCategory  = async()=>{
    try{
      const response=await Axios({
        ...SummaryApi.deleteSubcategory,
        data: deleteSubCategory
      })

      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({
          _id: ""
        })
      }

    }catch(error){  
      AxiosToastError(error)
    }

}










 const columnHelper=createColumnHelper();









 const fetchSubCategory = async()=>{
  try{
    setLoading(true);
     const response=await Axios({
      ...SummaryApi.getSubcategory

     })
      const {data : responseData} = response

      if(responseData.success){
        console.log("Fetched subcategories:", responseData.data);
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
     cell : ({row})=>{
       return (
        <>
         {
          row.original.category.map((c,index)=>{
            return (
               <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name} </p>
            )
          })
         }
        </>
       )
     }
   }),
   columnHelper.accessor("_id",{
       header:"Action",
       cell : ({row})=>{
         return (
         <div className='flex items-center justify-center gap-3 '>
           
          <button 
          onClick={() => {
             setOpenEdit(true);
             setEditData(
              row.original
             );
           }}
          className='p-2 bg-green-100 rounded-full hover:text-green-600'>
              <HiPencil size={20} />
          </button>
          <button 
          onClick={()=>{
            setOpenDeleteConfirmBox(true)
            setDeleteSubCategory(row.original)
          }}
          
          
          
          className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
              <MdDelete size={20} />
          </button>
         </div>
         )
       }
   })

     
 ]

 console.log("subcategory data", data)


  return (
    <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Sub Category</h2>
       <button onClick={ () => setOpenAddSubCategory(true)} className='text-sm border border-[#ece75f] hover:bg-[#e6cc00] px-3 py-1 rounded '>Add Sub Category</button>

    </div>

     <div className='overflow-auto w-full max-w-[95vw]'>

  <DisplayTable 
  
  data={data}
  column={column}
  
  
  />

     </div>


{

  openAddSubCategory && (
      <UploadSubCategoryModel
       close={() => setOpenAddSubCategory(false)}
       fetchData={fetchSubCategory}
      />
  )

}

{
  ImageUrl && (
    <ViewImage url={ImageUrl} close={() => setImageUrl("")} />
  )
}



{
  openEdit && (
    <EditSubCategory 
    data={editData} 
     close={() => setOpenEdit(false)} 
     fetchData={fetchSubCategory}
   />
  )
}


{
  openDeleteConfirmBox && (
    <CofirmBox
     cancel={() => setOpenDeleteConfirmBox(false)}
     close={() => setOpenDeleteConfirmBox(false)}
     confirm={handleDeleteSubCategory}
    />
  )
}




    </section>

  )
}

export default SubCategorypage
