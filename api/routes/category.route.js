import {Router} from 'express';
import {CategoryController} from "../controllers/index.js";

export const categoryRouter = Router();

categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.get('/', CategoryController.getAllCategories);
categoryRouter.get('/:category_id', CategoryController.getCategoryByCategoryId);
categoryRouter.delete('/:category_id', CategoryController.deleteByCategoryId);
categoryRouter.put('/:category_id', CategoryController.updateCategory);

