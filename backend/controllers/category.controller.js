import CategoryModel from "../models/category.model.js";
import subCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";
export const AddCategoryController = async (req, res) => {


    try{
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({ message: "Name and image are required", error: true, success: false });
        }

        

        const addCategory = new CategoryModel({
            name,
            image
        });

        const saveCategory =  await addCategory.save();
 
        if(!saveCategory){
            return res.status(500).json({ message: "Not Created", error: true, success: false });
        }


       return res.status(201).json({ message: "Category added successfully", data: saveCategory, error: false, success: true });

    }catch(err){

        
        res.status(500).json({ message: err.message , error: true, success: false });
    }   

}


export const getCategoryController = async (req, res) => {

    try{

     const data=await CategoryModel.find().sort({ createdAt: -1 });
    



     return res.status(200).json({ message: "Category fetched successfully", data: data, error: false, success: true });
    



    }catch(err){
        res.status(500).json({ message: err.message , error: true, success: false });
    }   
}

export const updateCategoryController = async (req, res) => {

    try{
       
        const  {_id,name,image} = req.body;
            
        const update =await CategoryModel.updateOne({
            _id: _id
        },{
            name,
            image
        })

 
        return res.status(200).json({ message: "Category updated successfully", data: update, error: false, success: true });

    }catch(err){
        return res.status(500).json({ message: err.message , error: true, success: false });
    }   
}

export const deleteCategoryController = async (req, res) => {

    try{
        const { _id } = req.body;
const checkSubCategory = await subCategoryModel.find({
    category: {
        "$in": [_id]
    }
}).countDocuments();
const checkProduct = await ProductModel.find({
    category: {
        "$in": [_id]
    }
}).countDocuments();

if(checkSubCategory > 0 || checkProduct > 0){
    return res.status(400).json({ message: " Category can't be deleted", error: true, success: false });
}

        const deleteCategory = await CategoryModel.deleteOne({ _id: _id })

        if(!deleteCategory){
            return res.status(500).json({ message: "Not Deleted", error: true, success: false });
        }
        return res.status(200).json({ message: "Category deleted successfully", data: deleteCategory, error: false, success: true });
        ;
    }catch(err){
        return res.status(500).json({ message: err.message , error: true, success: false });
    }   
}
