import Router from 'express';
import {loginUserController, logoutUserController, registerUserController,uploadAvatar,verifyEmailController}  from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import  upload  from '../middleware/multer.js'; // Assuming you have a middleware for handling file uploads

const userRouter = Router();


userRouter.post('/register',registerUserController);
userRouter.post('/verify-email',verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout',auth,logoutUserController);
userRouter.put('/upload-profile',auth,upload.single('avatar'),uploadAvatar);

export default userRouter;