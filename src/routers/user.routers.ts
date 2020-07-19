import {Router} from "express";
import {userLogin, userRegister} from "../controllers/user/user.controller";

export const userRouter = Router();

userRouter.route('/register')
    .post(userRegister);

userRouter.route('/login')
    .post(userLogin);
