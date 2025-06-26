import React from 'react'
import logo from '../assets/Evegro logo.png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'


const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";


  return (
    <header className='h-24 lg:h-20  lg:shadow-md sticky top-0  flex  flex-col justify-center'>
      {

        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center   px-2 justify-between '>
            {/* Logo  */}
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center'>
                <img src={logo}
                  alt="Evegro Logo"
                  className='h-16.5 w-22 hidden lg:block'
                />
                <img src={logo} alt="Evegro Logo" className='h-19 w-19  lg:hidden mt-[25px] ' />
              </Link>
            </div>
            <div className='hidden  lg:block '>
              <Search />
            </div>
            <div>
              <button className='text-neutral-600 mt-[25px]  lg:hidden  ' >
                <FaRegCircleUser size={26} />
              </button>
              <div className='hidden lg:block'>
                Login and my cart
              </div>
            </div>
          </div>
        )

      }



      <div className={`container mx-auto px-2 lg:hidden ${isSearchPage ? 'mt-[-8px]' : 'mt-[-20px] mb-8'}`}>
        <Search />
      </div>
    </header>
  )
}

export default Header
