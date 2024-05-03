import {accountRouter} from './accout.route.js';
import {Router} from "express";

export const router = Router();

router.use('/account', accountRouter);

