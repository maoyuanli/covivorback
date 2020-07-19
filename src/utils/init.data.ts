import {connectMongoose} from '../config/dbconnect';
import bcrypt from "bcrypt";
import {User} from "../models/user.model";
import fs from 'fs';
import {Profile} from "../models/profile.model";

connectMongoose();


export const initUser = async () => {
    try {
        // @ts-ignore
        await User.deleteMany();
        const user: string = 'user@abc.com';
        const pass: string = 'password';
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(pass, salt);
        const userRegistered = await User.create({
            username: user, password
        });
    } catch (e) {
        console.log(e);
    }
};

const profile = JSON.parse(fs.readFileSync(`${__dirname}/init-profile.json`
    , 'utf-8'));

export const initProfile = async () => {
    try {
        // @ts-ignore
        await Profile.deleteMany();
        const user = await User.findOne({'username': 'user@abc.com'});
        // @ts-ignore
        await Profile.create({...profile, user: user._id})
    } catch (e) {
        console.log(`error innitializing profile: ${e}`);
    }
};
