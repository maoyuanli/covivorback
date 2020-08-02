import {Profile} from "../models/profile.model";
import {Request, Response} from "express";

export const upsertProfile = async (req: Request, res: Response) => {
    try {
        const update = {
            location: req.body.profile.location,
            bio: req.body.profile.bio,
            photoUrl: req.body.profile.photoUrl,
            twitter: req.body.profile.twitter,
            facebook: req.body.profile.facebook,
            instagram: req.body.profile.instagram,
            linkedin: req.body.profile.linkedin,
            youtube: req.body.profile.youtube,
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

export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const profiles = await Profile.find().populate("user", "-password").cache();
        res.status(200).json({
            status: 'get all profiles success',
            profiles: profiles
        })
    } catch (e) {
        res.status(400).json({
            status: 'profiles not found',
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
