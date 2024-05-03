import {Router} from 'express';
import {AccountController} from "../controllers/index.js";
export const accountRouter = Router();

accountRouter.post('/', AccountController.createAccount);
accountRouter.get('/', AccountController.getAllAccounts);

