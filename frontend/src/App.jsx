import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import toast, { Toaster } from 'react-hot-toast'
import fetchUserDetails from '../utils/fetchUserDetails'
import { setUserDetails } from './redux/userSlice'
import { useDispatch } from 'react-redux'

 
function App() {

  const dispatch=useDispatch()

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.log('Error fetching user details:', error);
      // Don't show error toast for user details as it might be called on every page load
    }
  }


  useEffect(() => {
    fetchUser()
  },[])

  return (
    <>

   <Header/>
      <main className='min-h-[78vh]'  >
        <Outlet />
      </main>
      <Footer/>
      <Toaster/>
      </>
  )
}

export default App