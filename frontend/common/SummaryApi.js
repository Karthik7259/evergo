

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
    verifyForgotPasswordOtp : {
        url:'/evergo/user/verify-forgot-password-otp',
        method:'put',
    },
    resetPassword : {
        url:'/evergo/user/reset-password',
        method:'put',   
    },
    refreshToken :{
        url:'/evergo/user/refresh-token',
        method:'post'
    },
    userDetails :{
        url:'/evergo/user/user-details',
        method:'get'
    },
    logout : {
        url:'/evergo/user/logout',
        method:'get'
    },
    uploadAvatar : {
        url:'/evergo/user/upload-profile',
        method:'put'
    },
    updateUserDetails : {
        url:'/evergo/user/update-user',
        method:'put'
    }

}

export default SummaryApi;
