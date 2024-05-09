import {Router} from 'express';
import {AuthController} from "../controllers/index.js";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/signup", AuthController.signup);