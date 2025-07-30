const UploadImageController = async (req, res) => {
    try {
        const file= req.file; // Assuming you're using multer for file uploads

        // Handle image upload logic here

        return res.status(201).json({ message: "Image uploaded successfully", data: savedImage, error: false, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true, success: false });
    }
}



export default UploadImageController