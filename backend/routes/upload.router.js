import { Router } from "express";
import auth from "../middleware/auth.js ";
import UploadImageController from "../controllers/uploadimage.controller.js";


const uploadRouter = Router();


uploadRouter.post("/upload",auth,UploadImageController)

export default uploadRouter;