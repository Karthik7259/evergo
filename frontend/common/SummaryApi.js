export const baseurl= 'http://localhost:8080';


const SummaryApi = {

    register : {
        
        url:'/evergo/user/register',
        method: 'post',
    
    },
    login : {
        
        url:'/evergo/user/login',
        method: 'post',
    
    },
    forgotPassword : {
        url:'/evergo/user/forgot-password',
        method: 'put',
    },

}

export default SummaryApi;
