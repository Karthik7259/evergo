import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/uploadSubCategoryModel'

const SubCategorypage = () => {

 const [openAddSubCategory, setOpenAddSubCategory] = useState(false);




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
