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

<div className='p-4 grid grid-cols-4 '>
  {
  CategoryData.map((category,index) => {
    return(
      

           <div className='w-48 h-48 bg-[#ece75f]  rounded shadow '>
            <img
         alt={category.name}
         src={category.image}
         className='w-40 h-40 object-scale-down ml-auto mr-auto mt-2 rounded'
         key={index}
         />
         <p className='text-center text-sm '>{category.name}</p>

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
