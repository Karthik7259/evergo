import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
const Search = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const issearch = location.pathname === "/search";
    setIsSearchPage(issearch)

  }, [location])





  const redirectToSearchPage = () => {
    navigate('/search');
  }





  return (
    <div className='w-full  min-w-[240px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg border border-gray-200 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-[#2296bf] outline-none mt-[-20px]'>
      <button className='flex justify-center items-center h-full p-3 group-focus-within:text-[#6ecde3] '>
        <IoSearch size={22} />
      </button>
      <div className='w-full h-full'>
        {
          !isSearchPage ? (
            // not in search page
            <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Search  "Orgainic Food"',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Search  "Meat" ',
                  1000,
                  'Search  "Frozen Food"',
                  1000,
                  'Search  "Eggs"',
                  1000,
                  'Search  "Fresh Chicken"',
                  1000,
                  'Search  "Fresh Prawn"',
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
                     /// when i was search page
                  <div className='w-full h-full'>
                     <input
                       type='text'
                       placeholder='Search for Organic Food'
                       autoFocus={true}
                       className='bg-transparent w-full h-full outline-none'
                     />
                     
                    </div>
            )
        }

      </div>

    </div>
  )
}

export default Search
