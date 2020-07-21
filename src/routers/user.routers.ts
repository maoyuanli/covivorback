import {Router} from "express";
import {userAuth, userLogin, userRegister} from "../controllers/user.controller";
import {auth} from "../utils/auth";

export const userRouter = Router();

userRouter.route('/register')
    .post(userRegister);

userRouter.route('/login')
    .post(userLogin);

userRouter.route('/auth')
    .get(auth, userAuth)
