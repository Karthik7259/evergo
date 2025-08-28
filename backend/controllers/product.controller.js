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