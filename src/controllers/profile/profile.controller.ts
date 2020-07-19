import {Profile} from "../../models/profile.model";
import {Request, Response} from "express";

export const upsertProfile = async (req: Request, res: Response) => {
    try {
        const update = {
            location: req.body.profile.location,
            status: req.body.profile.status,
            hobby: req.body.profile.hobby,
            bio: req.body.profile.bio,
            social: req.body.profile.social,
        };
        // @ts-ignore
        const filter = {user: req.user._id}
        const options = {new: true, upsert: true, runValidators: true};
        const upsertedProfile = await Profile.findOneAndUpdate(
            filter, update, options
        );

        res.status(200).json({
            status: 'profile creation success',
            profile: upsertedProfile
        })
    } catch (e) {
        res.status(400).json({
            status: 'profile creation failed',
            message: e
        })
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userID = req.user._id;
        const profile = await Profile.find({'user': userID});
        res.status(200).json({
            status: 'success',
            profile: profile
        })
    } catch (e) {
        res.status(400).json({
            status: 'profile not found',
            message: e
        })
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userID = req.user._id;
        await Profile.findOneAndRemove({user: userID});
        res.status(200).json({
            status: 'success',
        })
    } catch (e) {
        res.status(400).json({
            status: 'operation failed',
            message: e
        })
    }

}
