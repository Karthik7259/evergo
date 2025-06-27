import axios from 'axios';
import { baseurl } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL: baseurl,
    withCredentials: true,
    timeout: 15000, // 15 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('Making request to:', config.url);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default Axios;
