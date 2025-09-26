import React, { use } from 'react'
import banner from '../assets/Banner3.png'
import mobilebanner from '../assets/Evegro logo.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'



const Home = () => {

  const LoadingCategory=useSelector(state => state?.product?.loadingCategory)
  const CategoryData=useSelector(state => state?.product?.allCategory)
  const subCategoryData=useSelector(state => state?.product?.allSubCategory)
  const navigate=useNavigate()
  
  // Helper to safely convert any value to a URL-friendly string
  const toUrlSafe = (val) => {
    if (val === undefined || val === null || val === "") return "default";
    try {
      return String(val)
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(",", "-")
        .replaceAll("&", "-")
        .replace(/[^a-z0-9-]/g, ""); // Remove any non-alphanumeric characters except hyphens
    } catch (err) {
      console.error("Error in toUrlSafe:", err);
      return "default";
    }
  };

  const handleRedirectProductListpage = (id,cat)=>{
    // Log detailed debug information
    console.log("DEBUG - Category click:", { 
      id, 
      cat,
      subCategoryData: subCategoryData, 
      isSubCategoryDataArray: Array.isArray(subCategoryData),
      subCategoryDataLength: subCategoryData?.length
    });
    
    // Safety check
    if (!id || !cat) {
      console.error("Missing category ID or name");
      return;
    }

    // If subcategory data is missing, navigate to a simpler URL
    if (!subCategoryData || !Array.isArray(subCategoryData) || subCategoryData.length === 0) {
      console.log("No subcategory data available, using simple URL");
      const simpleUrl = `/${toUrlSafe(cat)}-${id}`;
      console.log("url", simpleUrl);
      navigate(simpleUrl);
      return;
    }
    
    // Try to find a matching subcategory
    let subcategory = null;
    try {
      subcategory = subCategoryData.find(sub => {
        if (!sub?.category) return false;
        return Array.isArray(sub.category) && 
          sub.category.some(c => c?._id === id);
      });
      
      console.log("Matching subcategory found:", subcategory);
    } catch (err) {
      console.error("Error finding subcategory:", err);
    }
    
    // Create a URL with or without subcategory
    let url;
    
    if (subcategory?.name && subcategory?._id) {
      // We have a valid subcategory
      url = `/${toUrlSafe(cat)}-${id}/${toUrlSafe(subcategory.name)}-${subcategory._id}`;
    } else {
      // No valid subcategory, use first one as fallback or create simpler URL
      const firstSubcategory = subCategoryData[0];
      
      if (firstSubcategory?.name && firstSubcategory?._id) {
        url = `/${toUrlSafe(cat)}-${id}/${toUrlSafe(firstSubcategory.name)}-${firstSubcategory._id}`;
        console.log("Using fallback subcategory:", firstSubcategory.name);
      } else {
        url = `/${toUrlSafe(cat)}-${id}`;
        console.log("Using simple URL without subcategory");
      }
    }

    console.log("Final URL:", url);
    navigate(url)
  }

  // Converts a string to a URL-friendly format
  
  
  
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
            <div
            key={index+ "loading category "}
            className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse '>
                 <div className='bg-blue-100 min-h-24 rounded' ></div> 
              <div className='bg-blue-100 h-8 rounded '></div> 
             </div> 
          )
        })
        ) :(

          CategoryData?.map((cat,index) => {
             return (
               <div
               key={cat?._id+"displaycategory"}
               className='w-full h-full'
               onClick={()=>handleRedirectProductListpage(cat?._id,cat?.name)}
               >
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


    {
      /* display category product */
    }

   <div>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4  '>
         <h3>Dairy,Bread & Eggs</h3>
         <Link to="" className='text-green-600 hover:text-green-400 ' >See All</Link>
      </div>
   </div>





   </section>
  )
}

export default Home
