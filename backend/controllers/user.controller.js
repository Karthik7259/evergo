import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../services/sendEmail.js';
import generateAccessToken from '../utils/generatedAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import uploadImageToCloudinary from '../utils/uploadimageClodinary.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken';



export async function registerUserController(req, res) {
    try {
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required',
                error: true,
                success: false
             });
        }

        const user =await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists',
                error: true,
                success: false
             });        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

         const payload = {
            name,
            email,
            password: hashedPassword,
         }

         const newUser = new UserModel(payload);
        const save= await newUser.save();

        const verifyEmailUrl=`${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail=await sendEmail({
            sendTo:email,
            subject:"Verify email from Evergo",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })
        res.status(201).json({ 
            message: 'User registered successfully',
            success: true,
            error: false,
            data: save
         });
    } catch (error) {
        res.status(500).json({ 
            message: error.message || error,
            error : true,
            success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try{
   const {code} = req.body;

   const user = await UserModel.findOne({_id: code});
   if(!user){
        return res.status(404).json({ 
            message: 'User not found',
            error: true,
            success: false
         });
        } 

    const updatedUser = await UserModel.updateOne(
        { _id: code },
        {   verify_email: true  }
    );    return res.json({ 
        message: 'User verified successfully',
        error: false,
        success: true
     });

    }catch(error){
        res.status(500).json({ 
            message: error.message || error,
            error : true,
            success: false
        });
    }
}


// login user

export async function loginUserController(req, res) {
    try{
      const   {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required',
                error: true,
                success: false
             });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found',
                error: true,
                success: false
             });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password',
                error: true,
                success: false
             });
        }

        const accesstoken=await  generateAccessToken(user._id);
        const refreshtoken=await  generateRefreshToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'None', // Adjust based on your requirements
            
        };
        res.cookie('accessToken', accesstoken,cookieOptions);
        res.cookie('refreshtoken', refreshtoken,cookieOptions);

        return res.status(200).json({
            message: 'User logged in successfully',
            user,
            error: false,
            success: true,
            data : {
                accesstoken,
                refreshtoken
            }
        })
    }catch(error){
        res.status(500).json({ 
            message: error.message || error,
            error : true,
            success: false
        });
    }
}

export async function logoutUserController(req, res) { 
    try{

        const userId = req.userId; // Assuming auth middleware sets req.userId
        if (!userId) {
            return res.status(400).json({ 
                message: 'User not found',
                error: true,
                success: false
             });
        }

         // Clear cookies


        const cookieOptions = {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'None', // Adjust based on your requirements
            
        };
         res.clearCookie('accessToken', cookieOptions);
         res.clearCookie('refreshtoken', cookieOptions);

         const removerefreshtoken=await UserModel.findByIdAndUpdate(
            userId,
            { refreshToken: "" },
            
        );
            return res.status(200).json({
                message: 'User logged out successfully',
                error: false,
                success: true
            });
    }catch(error){
        res.status(500).json({ 
            message: error.message || error,
            error : true,
            success: false
        });
    }
}



export async function uploadAvatar(req,res) {
  try{
    const userId = req.userId; // Assuming auth middleware sets req.userId
    const image=req.file; // mullter middleware will handle the file upload and make it available in req.file

    const upload =await uploadImageToCloudinary(image)

    const updateUser=await UserModel.findByIdAndUpdate(
        userId,
        { avatar: upload.url }
        , { new: true }
        
    );

    return res.status(200).json({
        message: 'Image uploaded successfully',
        error: false,
        success: true,
        data:{
            _id: userId,
            avatar: upload.url,
            updateUser
        }
    });



  }catch(error){
    res.status(500).json({ 
        message: error.message || error,
        error : true,
        success: false
    });
  }
}



export async function updateuserDetails(req,res){
  try{
    const userId = req.userId; // Assuming auth middleware sets req.userId
    const {name,email,mobile,password} = req.body;
      
    
    let hashedPassword;
    if(password){
        const salt = await bcryptjs.genSalt(10);
        hashedPassword = await bcryptjs.hash(password, salt);
    }

    const updatedFields = {
  ...(name && { name }),
  ...(email && { email }),
  ...(mobile && { mobile }),
  ...(password && { password: hashedPassword }), // only include if password is provided
};

    const updatedUser=await UserModel.findByIdAndUpdate(
        userId,
       updatedFields, // Hash the password if provided
        { new: true }
        
    );
  
    return res.json({
        message: 'User profile updated successfully',
        error: false,
        success: true,
        data: updatedUser
    })
  }catch(error){
    res.status(500).json({ 
        message: error.message || error,
        error : true,
        success: false
    });
  }
}



export async function forgotPassword(req,res){
     try{
       const {email} = req.body;
       if(!email){
        return res.status(400).json({
            message: 'Email and otp is required',
            error: true,
            success: false
        });
       }

       const user=await UserModel.findOne({email});
       
       if(!user){
        return res.status(400).json({
            message: 'User not found',
            error: true,
            success: false
        });
       }
       
       const otp=generatedOtp();

       const expireTime=new Date() + 60 * 60 *1000 ;

    
     const update=await UserModel.findByIdAndUpdate(user._id,{$set:{
        forgot_password_otp:otp,
        forgot_password_expiry:new Date(expireTime).toISOString(),
     }});

    await sendEmail({
        sendTo: email,
        subject: 'Reset Password OTP from evergo',
        html: forgotPasswordTemplate({
            name: user.name,
            otp: otp

        })

    });

    return res.json({
        message: 'Check your email for the OTP',
        error: false,
        success: true,
        data: update
    })
    




     }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
     }
}

// verify forgot password otp

export async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: 'Email and OTP are required',
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }
        
        const currentTime = new Date().toISOString;
        const expiryTime = new Date(user.forgot_password_expiry);
        if (currentTime > expiryTime) {
            return res.status(400).json({
                message: 'OTP has expired',
                error: true,
                success: false
            });
        }

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'OTP verified successfully',
            error: false,
            success: true,
            data: user
        });
    } catch (error) {    
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}

// reset password after otp verification

export async function resetPassword(req, res) {
     try{
     const {email, newPassword,confirmPassword} = req.body;

     if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message: 'All fields are required',
            error: true,
            success: false
        });
     }
     const user = await UserModel.findOne({ email });
     if(!user){
        return res.status(400).json({
            message: 'User not found',
            error: true,
            success: false
        });
     }  
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: 'New Password and confirm Password must be same ',
                error: true,
                success: false
            });

        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
       
        const update=await UserModel.findByIdAndUpdate(
            user._id,
            { password: hashedPassword, forgot_password_otp: "", forgot_password_expiry: "" },
            { new: true }
        );  
        return res.json({
            message: 'Password reset successfully',
            error: false,
            success: true,
            data: update
        });
     }catch(error){
         return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
     }
    }


// refresh token controller

export async function refreshTokenController(req, res) {
    try {
        const refreshToken = req.cookies.refreshtoken
 || req.headers.authorization?.split(" ")[1]; // {bearer token}
        if (!refreshToken) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: true,
                success: false
            });
        }

        console.log("Refresh Token:", refreshToken);
        const verifyToken=await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // verify refresh token
        if (!verifyToken) {
            return res.status(401).json({
                message: 'Invalid refresh token',
                error: true,
                success: false
            });
        }

        
         console.log("Verified Token:", verifyToken);
         const userId = verifyToken?.id; // Extract user ID from the verified token
       const newAccessToken = await generateAccessToken(userId); // Generate a new access token

       const cookieOptions = {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'None', // Adjust based on your requirements
        }

       res.cookie('accessToken', newAccessToken,cookieOptions );

        return res.status(200).json({
            message: 'Access token refreshed successfully',
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}




