import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'





const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllsubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCategory, setDisplaySubCategory] = useState([])
  console.log("AllsubCategory", AllsubCategory)





  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1).join(" ")



  const categoryId = params.category.split("-").slice(-1)[0]

  const subcategoryId = params.subCategory.split("-").slice(-1)[0]



  const fetchProductdata = async () => {


    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          page: page,
          limit: 10
        }
      })

      const { data: responseData } = response

      console.log("responseData", responseData);
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData(prevData => [...prevData, ...responseData.data]);
        }

        setTotalPage(responseData.totalCount)
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchProductdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])


  useEffect(() => {
    const sub = AllsubCategory.filter(sub => {
      const filterData = sub.category.some(el => {
        return el._id === categoryId
      })

      return filterData ? filterData : null
    })

    setDisplaySubCategory(sub);
  }, [params, AllsubCategory])



  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container  sticky top-24 mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[230px_1fr]">
        {/* sidebar sub category */}
        <div className=" min-h-[79vh]  p-2 lg:w-57  grid gap-4  ">
          {
            DisplaySubCategory.map((sub, index) => {
              return (
                <div className='w-full p-2  bg-white  '>
                  <div className='w-full'>
                    <img
                      src={sub.image}
                      alt='subCategory'
                      className=' w-14  h-full object-scale-down '
                    />
                  </div>
                  <p className='  text-xs '>{sub.name}</p>

                </div>
              )
            })
          }

        </div>

        {/* product list */}
        <div className="flex-1">
          <div className='bg-white shadow-md p-4 '>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>
            <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
              {
                data.map((p, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  )
                })
              }
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage