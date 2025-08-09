import subCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async(req,res)=>{
  
try{



  const {name,image,category} = req.body;


   if(!name && !image  && !category[0]){
    return res.status(400).json({ message: "Name, image and category are required", error: true, success: false });

   }

   const payload= {
    name,
    image,
    category
   }

    const crateSubCategory=new subCategoryModel(payload)

    const save=await crateSubCategory.save()

     

      return res.json({
        message: "Sub-category created ",
        data: save,
        error: false,
        success: true
      })
     
}catch(error){
    return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    });
}




}

export const getSubCategoryController = async (req,res)=>{
  try{

    const data=await subCategoryModel.find().sort({createdAt:-1}).populate("category")


    return res.json({
      message:"Sub-categories data",
      data:data,
      error : false,
      success: true
    })

  }catch(error){
    return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    });
  }
}


