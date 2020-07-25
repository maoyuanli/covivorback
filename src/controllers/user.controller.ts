import {User} from "../models/user.model";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {provideConfig} from '../config/keys';
import {Profile} from "../models/profile.model";

export const userRegister = async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username;
        const fullname: string = req.body.fullname;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const userRegistered = await User.create({
            username, password, fullname
        });
        const filter = {user: userRegistered._id}
        const options = {new: true, upsert: true, runValidators: true};
        const update = {
            bio: 'not updated',
            location: 'not updated',
            photoUrl: 'https://img.icons8.com/material-sharp/96/000000/edit-user-male.png'
        }
        await Profile.findOneAndUpdate(
            filter, update, options
        );
        // @ts-ignore
        const token = jwt.sign({_id: userRegistered._id}, provideConfig().jwtPrivateToken);
        res.status(200).json({
            status: 'user added',
            token: 'Bearer ' + token
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username;
        const user = await User.findOne({username: username});
        if (!user) {
            res.status(400)
                .json({status: 'failed', message: 'invalide username or password'})
        }
        // @ts-ignore
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400)
                .json({status: 'failed', message: 'invalide username or password'})
        }
        // @ts-ignore
        const token = jwt.sign({_id: user._id}, provideConfig().jwtPrivateToken);
        res.status(200).json({
            success: true,
            token: 'Bearer ' + token
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};

export const userAuth = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userID = req.user._id;
        const user = await User.findById(userID).select('-password')
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({
                status: 'failure',
                message: 'user not authenticated'
            })
        }

    } catch (err) {
        res.status(500).json({
            status: 'user authentication failed',
            message: err
        })
    }

}
