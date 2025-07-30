import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';


const uploadImage = async(image)=>{

    try{
        const fromData = new FormData();
        fromData.append('image', image);
        const response =await Axios({
            ...SummaryApi.uploadImage,
            data:fromData,
           
        })
        return response

    }catch(err){
        console.error("Error uploading image:", err);
        throw err;
    }
}


export default uploadImage;