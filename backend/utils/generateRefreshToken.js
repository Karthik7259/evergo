import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
const generateRefreshToken =async (userId) => {
    const token=jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',

  });

 const updateRefreshTokenUser=await UserModel.updateOne(
    {_id:userId},{
        refreshToken:token
    }
 )
 

    return token;
};

export default generateRefreshToken;