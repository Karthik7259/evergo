import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'

const Categorypage = () => {
  const [openUploadModel, setOpenUploadModel] =useState(false);



  return (
   <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'>Category</h2>
       <button onClick={()=>setOpenUploadModel(true)} className='text-sm border border-[#ece75f] hover:bg-[#e6cc00] px-3 py-1 rounded '>Add Category</button>

    </div>

{
    openUploadModel && (
      <UploadCategoryModel close={()=>setOpenUploadModel(false)}/>
    )
}
   </section>
  )
}

export default Categorypage
