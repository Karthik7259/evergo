import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (image) => {
    if (!image || !image.buffer) {
        throw new Error('Invalid image file - no buffer found');
    }

    const buffer = image.buffer;

    const uploadImage=await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
           {
            folder: 'images',
           },
           (error,uploadResult) => {
              if (error) {
                  return reject(error);
              }
              return resolve(uploadResult)
           }
        ).end(buffer);
    });
    return uploadImage;
    }

    export default uploadImageToCloudinary;