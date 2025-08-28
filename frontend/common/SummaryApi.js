
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
    },
    addCategory : {
        url:'/evergo/category/add-category',
        method:'post'
    },
    uploadImage : {
        url :'/evergo/file/upload',
        method: 'post',
    },
    getCategory : {
        url:'/evergo/category/get',
        method:'get'
    },
    updateCategory : {
        url:'/evergo/category/update',
        method:'put'
    },
    deleteCategory : {
        url:'/evergo/category/delete',
        method:'delete'
    },
    createSubCategory : {
        url:'/evergo/sub-category/create',
        method:'post'
    },
    getSubcategory : {
        url:'/evergo/sub-category/get',
        method:'post'
    },
    updateSubcategory : {
        url:'/evergo/sub-category/update',
        method:'put'
    },
    deleteSubcategory : {
        url:'/evergo/sub-category/delete',
        method:'delete'
    },
    createProduct:{
        url:'/evergo/product/create',
        method:'post'
    },
    getProduct:{
        url:'/evergo/product/get',
        method:'post'
    }
   

}

export default SummaryApi;
