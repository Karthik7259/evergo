import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import Nodata from '../components/Nodata';
import SummaryApi from '../../common/SummaryApi';
import Axios from '../../utils/Axios';
import EditCategory from '../components/EditCategory';



const Categorypage = () => {
  const [openUploadModel, setOpenUploadModel] =useState(false);
 const [loading, setLoading] = useState(false);
 const [CategoryData, setCategoryData] = useState([]);
 const [openEdit,setOpenEdit] = useState(false);
 const [editCategoryData, setEditCategoryData] = useState({
    name: "",
    image: ""
 });
 

  const fetchCategory =async   () => {
    try{
       setLoading(true);
     const response =await Axios({
      ...SummaryApi.getCategory
   
      });
      console .log("response", response);
      const {data: responseData} = response;

      if(responseData.success){
        setCategoryData(responseData.data);
      }

      
    }catch(err){

    }finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
    fetchCategory();
  },[])


  return (
   <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Category</h2>
       <button onClick={()=>setOpenUploadModel(true)} className='text-sm border border-[#ece75f] hover:bg-[#e6cc00] px-3 py-1 rounded '>Add Category</button>

    </div>


{
  !CategoryData[0] && !loading && (
    <Nodata/>
  )
}

<div className='p-3 grid grid-cols-2 md:grid-cols-3 gap-4  lg:grid-cols-5 lg:gap-0 '>
  {
  CategoryData.map((category,index) => {
    return(
      

           <div className='w-43 h-56  bg-white flex flex-col items-center justify-between
              rounded shadow '>
            <img
         alt={category.name}
         src={category.image}
         className='w-full h-32 object-scale-down mt-3 rounded'
         key={index}
         />
         <p className='text-center text-sm mb-2.5 '>{category.name}</p>
 
             <div className=' flex items-center justify-between  w-full px-2 gap-2 mb-2 '>
              
              <button onClick={() =>{ setOpenEdit(true) 
              setEditCategoryData(category)}} 
              
              className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded '>Edit</button>
              <button className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>Delete</button>
             </div>
           </div>

         
    )
  })

 
}
</div>
    
    {
       loading && (
        <Loading />
      )
    }




{
    openUploadModel && (
      <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadModel(false)}/>
    )
}

{
  openEdit && (
    <EditCategory data={editCategoryData} close={()=>setOpenEdit(false)} fetchData={fetchCategory} />
  ) 
}



   </section>
  )
}

export default Categorypage
