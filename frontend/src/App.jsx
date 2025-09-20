import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import toast, { Toaster } from 'react-hot-toast'
import fetchUserDetails from '../utils/fetchUserDetails'
import { setUserDetails } from './redux/userSlice'
import { useDispatch } from 'react-redux'
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './redux/productSlice'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

 
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

    const fetchCategory =async   () => {
      try{
        dispatch(setLoadingCategory(true));
       const response =await Axios({
        ...SummaryApi.getCategory
     
        });
        console .log("response", response);
        const {data: responseData} = response;
  
        if(responseData.success){
          dispatch(setAllCategory(responseData.data));
          // setCategoryData(responseData.data);
        }
  
        
      }catch(err){
  
      }finally{
       dispatch(setLoadingCategory(false));
      }
    }


 const fetchSubCategory =async   () => {
      try{
        
       const response =await Axios({
        ...SummaryApi.getSubcategory

       });
       console .log("response", response);
       const {data: responseData} = response;

       if(responseData.success){
         dispatch(setAllSubCategory(responseData.data));
         // setCategoryData(responseData.data);
       }


      }catch(err){

      }
    }

    
          
        
    


  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
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