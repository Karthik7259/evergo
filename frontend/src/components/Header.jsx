import React from 'react'
import logo from '../assets/Evegro logo.png'
import Search from './Search'
import { Link } from 'react-router-dom'



const Header = () => {
  return (
    <header className='h-20 shadow-md sticky top-0 '>
           <div className='container mx-auto flex items-center  h-full px-2 justify-between'>
            {/* Logo  */}
             <div className='h-full'>
                 <Link  to={"/"} className='h-full flex justify-center items-center'>
                    <img src={logo} 
                    alt="Evegro Logo" 
                    className='h-16.5 w-22 hidden lg:block'
                    />
                    <img src={logo} alt="Evegro Logo" className='h-15 w-10 lg:hidden' />
                 </Link>
            </div> 
           <div>
             <Search/>
           </div>
   <div>
    login and my cart
   </div>
           </div>
    </header>
  )
}

export default Header
