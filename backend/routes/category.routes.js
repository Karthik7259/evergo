import {Router} from 'express';
import auth from '../middleware/auth.js';

const categoryRouter = Router();

categoryRouter.post("/add-category",auth,AddCategoryController)




export default categoryRouter