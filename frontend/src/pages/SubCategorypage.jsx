import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/uploadSubCategoryModel'
import AxiosToastError from '../../utils/AxiosToastError';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';

const SubCategorypage = () => {

 const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
 const [data,setData]=useState([])

 const fetchSubCategory = async()=>{
  try{

     const response=await Axios({
      ...SummaryApi.getSubcategory

     })
      const {data : responseData} = response

      if(responseData.success){
        
        setData(responseData.data)
      }






  }catch(error){
    AxiosToastError(error)
  }
 }



  return (
    <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Sub Category</h2>
       <button onClick={ () => setOpenAddSubCategory(true)} className='text-sm border border-[#ece75f] hover:bg-[#e6cc00] px-3 py-1 rounded '>Add Sub Category</button>

    </div>


{

  openAddSubCategory && (
      <UploadSubCategoryModel
       close={() => setOpenAddSubCategory(false)}
      
      />
  )

}






    </section>

  )
}

export default SubCategorypage
