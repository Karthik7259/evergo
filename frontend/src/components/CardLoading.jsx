import React from 'react'

const CardLoading = () => {
  return (
     <div className='border py-2 lg:p-4 flex flex-col gap-2 lg:gap-3 w-36 lg:w-52 h-64 lg:h-72 rounded cursor-pointer bg-white animate-pulse overflow-hidden'>
      {/* Fixed height image placeholder */}
      <div className='h-24 lg:h-32 bg-blue-50 rounded flex-shrink-0 w-full'>
      </div>
      {/* Tag placeholder */}
      <div className='p-2 lg:p-3 bg-blue-50 rounded w-20 flex-shrink-0'>
      </div>
      {/* Name placeholder */}
      <div className='p-2 lg:p-3 bg-blue-50 rounded w-full flex-shrink-0'>
      </div>
      {/* Unit placeholder */}
      <div className='p-2 lg:p-3 bg-blue-50 rounded w-14 flex-shrink-0'>
      </div>

      {/* Bottom section placeholder */}
      <div className='mt-auto flex items-center justify-between gap-3 flex-shrink-0 w-full'>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-16'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-14'>
        </div>
      </div>

    </div>
  )
}

export default CardLoading