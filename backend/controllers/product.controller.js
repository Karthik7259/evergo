import ProductModel from '../models/product.model.js';
export const createProductController = async (req, res) => {
    try {
     const  {
         name ,
         image ,
         category ,
         subCategory,
         unit ,
         stock ,
         price ,
         discount,
         description ,
         more_details,
     } = req.body;

  if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !description) {
       return res.status(400).json({
           error: true,
           success: false,
           message: "Please fill all fields"
       });
   }

     const product = new ProductModel({
         name,
         image,
         category,
         subCategory,
         unit,
         stock,
         price,
         discount,
         description,
         more_details,
     });

    const saveProduct= await product.save();
     res.status(201).json(
        {
            success: true,
            error: false,
            message: "Product created successfully",
            data: saveProduct
        }
    );
    } catch (error) {
      res.status(500).json({ 
        error: true,
        success: false,
        message: error.message || error

      });
    }
  };

export const getProductController=async (req,res)=>{
  try{
     

     let {page,limit,search}=req.body;

     if(!page ){
      page=1
     }

     if(!!limit){
      limit=10
     }
  

      const query=search? {
           $text:{
            $search:search
           }
      }:{}
     // product 

     /// total no of products
 const skip=(page-1)*limit
     const [data,totalCount]=await Promise.all([
      ProductModel.find(query).sort({createdAt: -1}).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
     ])





     return res.status(200).json({
      error: false,
      success: true,
      message: "Product data",
      totalCount: totalCount,
      totalNopage: Math.ceil(totalCount / limit),
      data:data,
     });
  }catch(error){
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message || error
    });
  }
};

export const getProductByCategory=async(req,res)=>{
  try{
      const { id }=req.body;
      if(!id){
        return res.status(400).json({
          error: true,
          success: false,
          message: "provide category id"
        });
      }
      const product=await ProductModel.find({
          category:{ $in : id }
      }).limit(15);
     
      return res.status(200).json({
        error: false,
        success: true,
        message: "Product data",
        data:product
      });

  }catch(error){
      return res.status(500).json({
        error: true,
        success: false,
        message: error.message || error
      });
  }

};

export const getProductByCategoryAndSubCategory=async(req,res)=>{
  try{
      const { categoryId, subcategoryId, page=1, limit=10 }=req.body;
      console.log("categoryId, subcategoryId", categoryId, subcategoryId);
      if(!categoryId || !subcategoryId){  
        return res.status(400).json({
          error: true,
          success: false,
          message: "provide category and sub-category id"
        });
      }
      
      // Correctly format the query with categoryId and subcategoryId as values, not objects
      const query={
        category: { $in: [categoryId] },
        subCategory: { $in: [subcategoryId] }  // Note: Changed "subcategory" to "subCategory" to match the schema
      };
      
      const skip=(page-1)*limit


      const [data,dataCount]=await Promise.all([
          ProductModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit),
          ProductModel.countDocuments(query) 
      ])

      

    
     
      return res.status(200).json({
        error: false,
        success: true,
        message: "Product list",
        data:data,
        totalCount:dataCount,
        page:page,
        limit:limit,
      });

  }catch(error){
      return res.status(500).json({
        error: true,
        success: false,
        message: error.message || error
      });
  }
};


export const getProductDetails=async(req,res)=>{
  try{
  
 const {productId}=req.body;

 const product =await ProductModel.findOne({_id: productId})

 
     return res.status(200).json({
      error: false,
      success: true,
      message: "Product details",
      data:product
     });


  }catch(error){
      return res.status(500).json({
        error: true,
        success: false,
        message: error.message || error
      });
  }
};