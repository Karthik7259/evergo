import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';


const uploadImage = async(image)=>{

    try{
        const formData = new FormData();
        formData.append('image', image);
        
        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response

    }catch(err){
        console.error("Error uploading image:", err);
        throw err;
    }
}


export default uploadImage;