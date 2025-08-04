 import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Nodata = () => {
  return (
    <div className='flex flex-col items-center justify-center p-2'>
    <div >
         <DotLottieReact
      src="https://lottie.host/24f1ba0a-41ad-479b-91a6-cf9761d74542/XuGNXea0x6.lottie"
      loop
      autoplay
     className='w-[300px] h-[300px]  lg:h-[500px] object-scale-down '
    />
    
    </div>
    <div className='flex flex-col items-center justify-center mt-[-50px]'  >
        <p className='text-neutral-500   lg:mt-[-80px]'>No data</p>
    </div>
    </div>
   
  );
};

export default Nodata;
