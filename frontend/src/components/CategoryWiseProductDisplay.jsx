import React from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../../utils/AxiosToastError'
import Axios from '../../utils/Axios'
import { useEffect, useState } from 'react'
import SummaryApi from '../../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useRef } from 'react'

const CategoryWiseProductDisplay = ({ id, name }) => {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(false)
   const containerRef = useRef();
   const loadingCardNumber = new Array(6).fill(null)

   const fetchCategoryWiseProduct = async () => {
      try {
         setLoading(true);
         console.log(`[${name}] Fetching products for category ID:`, id);

         const response = await Axios({
            ...SummaryApi.getProductByCategory,
            data: { id: id }
         });

         console.log(`[${name}] API response:`, response);
         const { data: responseData } = response;

         console.log(`[${name}] Response data:`, responseData);

         if (responseData.success) {
            console.log(`[${name}] Setting data with ${responseData.data.length} products`);

            if (responseData.data.length === 0) {
               console.log(`[${name}] No products found for this category`);
            } else {
               console.log(`[${name}] First product:`, {
                  name: responseData.data[0].name,
                  id: responseData.data[0]._id,
                  category: responseData.data[0].category
               });

               // Check if category ID matches what we're expecting
               const categoryMatch = responseData.data[0].category.includes(id);
               console.log(`[${name}] Product category matches request ID? ${categoryMatch}`);
            }

            setData(responseData.data);
         }

      } catch (err) {
         console.error(`[${name}] Error fetching products:`, err);
         AxiosToastError(err);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchCategoryWiseProduct();
   }, [])

   const handleScrollRight = () => {
      containerRef.current.scrollLeft += 200;
   }


   const handleScrollLeft = () => {
      containerRef.current.scrollLeft -= 200;
   }


   return (
      <div>
         <div className='container mx-auto p-4 flex items-center justify-between gap-4  '>
            <h3 className='font-semibold text-lg md:text-xl '>{name}</h3>
            <Link to="" className='text-green-600 hover:text-green-400' >See All</Link>
         </div>
         <div className='relative flex items-center'>
            <div className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth" ref={containerRef}>

               {
                  loading &&
                  loadingCardNumber.map((_, index) => {
                     return (
                        <div className="flex-shrink-0" key={"categorywiseproductdisplay123" + index}>
                           <CardLoading />
                        </div>
                     )
                  })
               }

               {
                  data.length > 0 ? (
                     data.map((p, index) => {
                        return (
                           <div className="flex-shrink-0" key={p._id + "categorywiseproductdisplay" + index}>
                              <CardProduct data={p} />
                           </div>
                        )
                     })
                  ) : (
                     !loading && (
                        <div className="w-full p-4 text-center">
                           No products found for this category
                        </div>
                     )
                  )}

            </div>
            <div className='w-full left-0 right-0  container mx-auto px-2  absolute hidden lg:flex justify-between  '>
               <button
                  onClick={handleScrollLeft}
                  className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full   '>
                  <FaAngleLeft />

               </button>
               <button
                  onClick={handleScrollRight}
                  className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full   '>
                  <FaAngleRight />

               </button>
            </div>

         </div>
      </div>
   )
}

export default CategoryWiseProductDisplay