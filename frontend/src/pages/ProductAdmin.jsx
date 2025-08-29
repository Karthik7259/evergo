import React, { useState, useEffect } from 'react';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';
import Loading from '../components/Loading';
import ProductCardAdmin from '../components/ProductCardAdmin';

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalpage, setTotalpage] = useState(1);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { 
          page:page,
          limit:12
         }
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setTotalpage(responseData.totalNopage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext=()=>{
     

     if(page !== totalpage) {
       setPage(prev => prev +1)
     }

  }

  const handlePrevious=()=>{
    if(page>1){
      setPage(prev => prev -1)
    }
  }



  return (
   <section>
    <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between '> 
       <h2 className='font-semibold'> product </h2>
    </div>
    {
      loading &&(
        <Loading />
      )
    }

 

<div className='p-4 bg-blue-50 '>

 <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
    {
      productData.map((p,index) => {
        return (
          <ProductCardAdmin key={index} data={p}/>
        )
      })
    }
</div>

<div className='flex justify-between my-4 '>
  <button onClick={handlePrevious} className='border border-amber-300 px-4 py-1 hover:bg-amber-500 '>Previous</button>
  <button className='w-full bg-slate-100'>{page}/{totalpage}</button>
  <button onClick={handleNext} className='border border-amber-300 px-4 py-1  hover:bg-amber-500'>Next</button>
</div>




</div>








    </section>
  );
};

export default ProductAdmin;
