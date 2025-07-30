import uploadImageToCloudinary from "../utils/uploadimageClodinary.js";

const UploadImageController = async (req, res) => {
    try {
        const file = req.file; // Multer provides the file in req.file
        
        if (!file) {
            return res.status(400).json({
                message: "No image file provided",
                error: true,
                success: false
            });
        }
       
        const uploadedImage = await uploadImageToCloudinary(file);
        
        if (!uploadedImage || !uploadedImage.secure_url) {
            return res.status(500).json({
                message: "Error uploading image",
                error: true,
                success: false   
            });
        }

        return res.json({
            message: "Image uploaded successfully",
            data: uploadedImage,
            error: false,
            success: true
        });


    } catch(error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({
            message: "Error uploading image",
            error: true,
            success: false
        });
    }
}

    


export default UploadImageController