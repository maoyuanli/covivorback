import {Router} from "express";
import {deleteProfile, getAllProfiles, getProfile, upsertProfile} from "../controllers/profile.controller";
import {auth} from "../utils/auth";

export const profileRouter = Router();

profileRouter.route('/upsert').post(auth, upsertProfile)

profileRouter.route('/get').get(auth, getProfile)

profileRouter.route('/getall').get(getAllProfiles)

profileRouter.route('/delete').delete(auth, deleteProfile)
