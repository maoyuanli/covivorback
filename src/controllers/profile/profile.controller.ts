import {Profile} from "../../models/profile.model";
import {Request, Response} from "express";

export const createProfile = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.create({
            location: req.body.profile.location,
            status: req.body.profile.status,
            hobby: req.body.profile.hobby,
            bio: req.body.profile.bio,
            social: req.body.profile.social,
            // @ts-ignore
            user: req.user._id
        });
        res.status(200).json({
            status: 'profile creation success',
            profile: profile
        })
    } catch (e) {
        res.status(400).json({
            status: 'profile creation failed',
            message: e
        })
    }
}

export const getProfile = async  (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const userID = req.user._id;
        const profile = await Profile.find({'user':userID});
        res.status(200).json({
            status:'success',
            profile:profile
        })
    }catch (e) {
        res.status(400).json({
            status: 'profile not found',
            message: e
        })
    }
};
