import axios from 'axios';
import SummaryApi, { baseurl } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL: baseurl,
    withCredentials: true,
    timeout: 15000, // 15 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
// sending access token in header
Axios.interceptors.request.use(
        async(config)=>{
            const accessToken=localStorage.getItem('accesstoken');

            if(accessToken){
                config.headers.authorization= `Bearer ${accessToken}`;
            }

            return config;
            
        },

        (err)=>{


            return Promise.reject(err)

        }



);

/// extend the life span of access tokem with
// the help refresh token

Axios.interceptors.request.use(

    (response)=>{
        return response;

    },
    async(err)=>{
        let originRequest=err.config;

        if(err.response.status === 401 && !originRequest.retry){
             originRequest.retry = true;

             const refreshToken = localStorage.getItem('refreshtoken');

           if(refreshToken){
                   const newAccessToken=await refreshAccessToken(refreshToken)

                   if(newAccessToken){
                     originRequest.headers.authorization= `Bearer ${newAccessToken}`;
                     return Axios(originRequest);
                   }
           }
        }

        return Promise.reject(err);
    }
)

const refreshAccessToken=async (refreshToken) => {

     try{
      const response = await Axios({
        ...SummaryApi.refreshToken,
        headers:{
            Authorization:`Bearer ${refreshToken}`

        }
        });

        const accessToken=response.data.data.accessToken;
        localStorage.setItem('accesstoken', accessToken);
        return accessToken;
     }catch(err){
          console.log(err)
     }

}

export default Axios;
