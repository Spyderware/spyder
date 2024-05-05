import {accountRouter} from './account.route.js';
import {categoryRouter} from './category.route.js';
import {Router} from "express";

export const router = Router();

router.use('/account', accountRouter);
router.use('/category', categoryRouter);

