import {Router} from "express";
import {getProfile, upsertProfile} from "../controllers/profile/profile.controller";
import {auth} from "../utils/auth";

export const profileRouter = Router();

profileRouter.route('/upsert').post(auth, upsertProfile)

profileRouter.route('/get').get(auth, getProfile)
