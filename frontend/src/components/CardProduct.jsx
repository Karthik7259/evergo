import React from 'react'
import { DisplayPriceinRupees } from '../../utils/DisplayPriceinRupees'
import { Link } from 'react-router-dom'

const CardProduct = ({data}) => {

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




    const url =`product/${toUrlSafe(data.name)}-${data._id}`
  return (
    <Link
    to={url}
    className='border py-2 lg:p-4 flex flex-col w-36 lg:w-52 h-64 lg:h-72 rounded cursor-pointer bg-white overflow-hidden'>
        {/* Image container with fixed height */}
        <div className='h-24 lg:h-32 w-full rounded overflow-hidden flex items-center justify-center flex-shrink-0'> 
            <img
            src={data.image[0]}
            className='w-full h-full object-scale-down lg:scale-125'
            alt={data.name}
            />
        </div>
        {/* Tag with fixed width */}
        <div className='rounded text-xs w-fit p-[1px] px-2 mt-2 text-green-400 bg-green-50 flex-shrink-0'> 
            10min
        </div>
        {/* Product name with strict text truncation */}
        <div className='w-full px-2 lg:px-0 font-medium text-sm lg:text-base truncate overflow-hidden text-ellipsis'> 
            {data.name}
        </div>
        {/* Unit with fixed width */}
        <div className='w-full px-2 lg:px-0 text-sm lg:text-base truncate overflow-hidden'> 
            {data.unit}
        </div>
        
        {/* Bottom section that stays at the bottom */}
        <div className='mt-auto px-2 py-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base flex-shrink-0'>
            <div className='font-semibold truncate'> 
              {DisplayPriceinRupees(data.price)}
            </div>
            <div className='flex-shrink-0'> 
                <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded whitespace-nowrap'>
                    Add
                </button>
            </div>
        </div>
        






        </Link>
  )
}

export default CardProduct