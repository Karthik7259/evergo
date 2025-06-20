import jwt from 'jsonwebtoken';

const auth =async (req, res, next) => {
    try{

        const token=req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; // {bearer token}
        if(!token){
            return res.status(401).json({
                message: 'Access denied, no token provided',
                error: true,
                success: false
            });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                message: 'Access denied, invalid token',
                error: true,
                success: false
            });
        }
        req.userId = decoded.id;
        next();

    }catch(error){
        return res.status(500).json({ 
            message: error.message || error,
            error : true,
            success: false
        });
    }
}

export default auth;