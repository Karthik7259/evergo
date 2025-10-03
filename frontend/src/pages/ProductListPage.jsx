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
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../../utils/ValidURLConvert'





const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllsubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])
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
   
<section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24  mx-auto grid grid-cols-[90px_1fr]  md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]'>
        {/**sub category **/}
        <div className=' min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {
            DisplaySubCatory.map((s, index) => {
               const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
              return (
                <Link to={link} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subcategoryId === s._id ? "bg-green-100" : ""}
                `}
                >
                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                    <img
                      src={s.image}
                      alt='subCategory'
                      className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                    />
                  </div>
                  <p className=' lg:mt-0  text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>


        {/**Product **/}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

           <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
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
           </div>

            {
              loading && (
                <Loading />
              )
            }

          </div>
        </div>
      </div>
    </section>


  )
}

export default ProductListPage