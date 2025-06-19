import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './db/connectDB.js';
import userRouter from './routes/user.routes.js';

const app = express();
app.use(cors({
    Credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

const PORT=8080 || process.env.PORT;


app.get("/",(req, res) => {
    res.status(200).json({
        message: "Welcome to Evergo API"
    });
})

app.use('/evergo/user',userRouter)


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });