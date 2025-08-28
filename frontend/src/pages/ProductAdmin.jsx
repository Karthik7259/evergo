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

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page }
      });
      const { data: responseData } = response;
      if (responseData.success) {
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

<div>
  <button>Previous</button>
  <button>Next</button>
</div>




</div>








    </section>
  );
};

export default ProductAdmin;
