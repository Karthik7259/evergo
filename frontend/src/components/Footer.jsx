import React from 'react'
import {FaFacebook, FaTwitter, FaInstagram,FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
     <footer className='border-t p-4'>
          <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2 '>
           <p> &copy;  All Rights Reserved 2023 Evegro</p>           <div className='flex items-center gap-4 justify-center text-2xl'>
             <a href="" className='hover:text-primary-200 '>
                <FaFacebook/>
             </a>
             <a href='' className='hover:text-primary-200 '>
                <FaInstagram/>
             </a>
                <a href='' className='hover:text-primary-200 '>
                    <FaTwitter/>
                </a>
                <a href='' className='hover:text-primary-200 '>
                    <FaLinkedin/>
                </a>
           </div>
          </div>
     </footer>
  )
}

export default Footer
