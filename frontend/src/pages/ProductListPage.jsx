import React from 'react'
import { useParams } from 'react-router-dom'
const ProductListPage = () => {
  const params=useParams();
  

  console.log("params", params);
  return (
  //  <section className='sticky top-24 lg:top-20'> 
  //  <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr] '> 
  //   {/* sidebar sub category */}
  //    <div className='bg-red-500 min-h-[79vh]'> 
      
  //      </div> {/* product list */} 
  //      <div className='bg-green-600'> 
  //       product 
  //       </div>
  //        </div>
  //         </section>

  <section className="flex border border-black min-h-[79vh]">
  {/* Sidebar */}
  <div className=" w-[90px] md:w-[200px] lg:w-[280px]">
     
  </div>

  {/* Product list */}
  <div className=" flex-1">
    product
  </div>
</section>




  )
}

export default ProductListPage