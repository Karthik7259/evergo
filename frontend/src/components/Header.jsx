import React from 'react'
import logo from '../assets/Evegro.png'



const Header = () => {
  return (
    <header className='h-20 shadow-md sticky top-0'>
           <div className='container mx-auto  items-center h-full '>
            {/* Logo  */}
             <div className='h-full flex justify-center items-between'>
                 <div>
                    <img src={logo} alt="Evegro Logo" className='h-20 w-20' />


                 </div>
                
                
                </div> 
            
            {/* Search */}

          <div>
              Search
          </div>

            {/* login and my cart */}

         <div>
            Login and my cart
         </div>


            </div>
    </header>
  )
}

export default Header
