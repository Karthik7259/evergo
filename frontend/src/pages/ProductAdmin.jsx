import React, { useState, useEffect } from 'react';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import AxiosToastError from '../../utils/AxiosToastError';

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProductData = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  return (
    <div>
      ProductAdmin
      {/* You can render productData here */}
    </div>
  );
};

export default ProductAdmin;
