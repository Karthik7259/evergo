import toast from 'react-hot-toast';




const AxiosToastError = (error) => {
    if (error.response) {
        // The server responded with a status code outside the 2xx range
        toast.error(error.response.data.message || 'Error from server');
    } 
     else {
        // Something happened in setting up the request
        toast.error(error.message || 'An error occurred');
    }
}


export default AxiosToastError;