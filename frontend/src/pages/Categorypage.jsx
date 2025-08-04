import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import Nodata from '../components/Nodata';
import SummaryApi from '../../common/SummaryApi';
import Axios from '../../utils/Axios';



const Categorypage = () => {
  const [openUploadModel, setOpenUploadModel] =useState(false);
 const [loading, setLoading] = useState(false);
 const [CategoryData, setCategoryData] = useState([]);

 

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
      

           <div className='w-32 h-48  bg-white flex flex-col items-center justify-between
              rounded shadow '>
            <img
         alt={category.name}
         src={category.image}
         className='w-full  object-scale-down mt-3 rounded'
         key={index}
         />
         <p className='text-center text-sm mb-2.5 '>{category.name}</p>

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
   </section>
  )
}

export default Categorypage
