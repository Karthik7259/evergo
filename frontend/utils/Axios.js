import axios from 'axios';

import { baseurl } from '../common/SummaryApi';


const Axios=axios.create({
    baseURL: baseurl,
    withCredentials: true,

})


export default Axios;
