import {Router} from "express";
import {createProfile, getProfile} from "../controllers/profile/profile.controller";
import {auth} from "../utils/auth";

export const profileRouter = Router();

profileRouter.route('/create').post(auth, createProfile)

profileRouter.route('/get').get(auth, getProfile)
