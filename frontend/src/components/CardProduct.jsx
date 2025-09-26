import React from 'react'
import { DisplayPriceinRupees } from '../../utils/DisplayPriceinRupees'

const CardProduct = ({data}) => {
  return (
    <div className='border p-4 grid gap-3 max-w-52 lg:min-w-52 rounded'>
        <div className='min-h-20 max-h-32  rounded   '> 
            <img
            src={data.image[0]}
            className='w-full h-full object-scale-down  scale-125  '
            />
        </div>
        <div className='rounded text-sm w-fit p-[1px] px-2 mt-2 text-green-400  bg-green-50 '> 
            10min
        </div>
          <div className=' font-medium  text-ellipsis line-clamp-1 '> 
            {data.name}
        </div>
          <div className='w-fit '> 
            {data.unit}
        </div>
          

            <div className='flex items-center justify-between gap-3 '>
                <div className='font-semibold'> 
                  {DisplayPriceinRupees(data.price)}
        </div>
         <div className=' '> 
            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded  '>
                Add
            </button>
        </div>
        

          </div>
        






        </div>
  )
}

export default CardProduct