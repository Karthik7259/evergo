import React, { use } from 'react'
import banner from '../assets/Banner3.png'
import mobilebanner from '../assets/Evegro logo.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const LoadingCategory=useSelector(state => state?.product?.loadingCategory)
  const CategoryData=useSelector(state => state?.product?.allCategory)
  const subCategoryData=useSelector(state => state?.product?.allSubCategory)
  const navigate=useNavigate()
  const handleRedirectProductListpage = (id,cat)=>{
 

  const subcategory=subCategoryData.find(sub=>{
       const filterData=sub.category.some(c => {
        return c._id == id
       })

        return filterData ? true : null;
  })

  const url=`/${validURLConvert(cat.name)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`

  console.log("subcategory", url)
  }
  
  
  
  
  
  return (
   <section className='bg-white '>
<div className="container mx-auto">
  <div className={`w-full h-full min-h-48 bg-blue-100 rounded overflow-hidden ${
    !banner && "animate-pulse my-2"
  }`}>
    <img
      src={banner}
      className ="w-full h-full object-contain hidden lg:block"
      alt="banner"
    />
    <img
      src={mobilebanner}
      className ="w-full h-full object-cover  lg:hidden"
      alt="banner"
    />
  </div>
</div>

    <div className='container mx-auto px-4 my-2 grid grid-cols-5  md:grid-cols-8 lg:grid-cols-7 gap-2 '>
      {
        LoadingCategory? (
          new Array(12).fill(null).map((c,index)=>{
          return (
            <div className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse '>
                 <div className='bg-blue-100 min-h-24 rounded' ></div> 
              <div className='bg-blue-100 h-8 rounded '></div> 
             </div> 
          )
        })
        ) :(

          CategoryData?.map((cat,index) => {
             return (
               <div className='w-full h-full'
               onClick={()=>handleRedirectProductListpage(cat?._id,cat?.name)}
               key={index}>
                 <div>
                   <img
                     src={cat?.image}
                     alt={cat?.name}
                     className='w-full h-full object-scale-down '
                   />
                         <p className="text-center mt-2 font-medium">{cat?.name}</p>
                 </div>
               </div>
             )           })
              
        )
        
      }
    </div>
   </section>
  )
}

export default Home
