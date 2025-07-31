import CategoryModel from "../models/category.model.js";

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

     const data=await CategoryModel.find();
    



     return res.status(200).json({ message: "Category fetched successfully", data: data, error: false, success: true });
    



    }catch(err){
        res.status(500).json({ message: err.message , error: true, success: false });
    }   
}