import {forgotPassword, getUserDetails, loginUserController, logoutUserController, refreshTokenController, registerUserController,resetPassword,updateuserDetails,uploadAvatar,userDetails,verifyEmailController, verifyForgotPasswordOtp}  from '../controllers/user.controller.js';
import Router from 'express';
import auth from '../middleware/auth.js';
import  upload  from '../middleware/multer.js'; // Assuming you have a middleware for handling file uploads

const userRouter = Router();


userRouter.post('/register',registerUserController);
userRouter.post('/verify-email',verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout',auth,logoutUserController);
userRouter.get('/user-details',auth,getUserDetails);
userRouter.put('/upload-profile',auth,upload.single('avatar'),uploadAvatar);
userRouter.put('/update-user',auth,updateuserDetails);
userRouter.put('/forgot-password',forgotPassword)   
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetPassword);
userRouter.post('/refresh-token',refreshTokenController);
userRouter.get('/user-details',auth,userDetails);






export default userRouter;