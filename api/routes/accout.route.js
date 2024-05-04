import {Router} from 'express';
import {AccountController} from "../controllers/index.js";

export const accountRouter = Router();

accountRouter.post('/', AccountController.createAccount);
accountRouter.get('/', AccountController.getAllAccounts);
accountRouter.get('/:account_id', AccountController.getAccountByAccountId);
accountRouter.delete('/:account_id', AccountController.deleteByAccountId);
accountRouter.put('/:account_id', AccountController.updateAccount);

