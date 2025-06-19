import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../services/sendEmail.js';
import generateAccessToken from '../utils/generatedAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';

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
             });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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
    );

    return response.json({ 
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
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
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

