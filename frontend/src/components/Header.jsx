import React from 'react'
import logo from '../assets/Evegro logo.png'
import Search from './Search'
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
import {BsCart4} from 'react-icons/bs'
import { useSelector } from 'react-redux'


const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname === "/search";

  const user=useSelector((state)=>state?.user)

  console.log("user from store", user);

  const redirectToLoginPage = () => {
    navigate('/login');
  }

  return (
    <header className='h-24 lg:h-20  lg:shadow-md sticky top-0  flex  flex-col justify-center gap-1 bg-white'>
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
              {/* user icon it is visible only on mobile */}
              <button className='text-neutral-600 mt-[25px]  lg:hidden  ' >
                <FaRegCircleUser size={26} />
              </button>
              {/* Desktop */}
              <div className='hidden lg:flex items-center gap-8' >
                  <button onClick={redirectToLoginPage} className='text-lg px-2 '>Login</button>
                  <button className='flex items-center gap-2 bg-green-800  hover:bg-green-700 px-3 py-3 rounded text-white '>
                      <div className='animate-bounce'>
                              <BsCart4 size={26} />
                      </div>
                      <div className='font-semibold '>
                        <p>My Cart</p> 
                      </div>
                  </button>
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
