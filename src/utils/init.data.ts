import {connectMongoose} from '../config/dbconnect';
import bcrypt from "bcrypt";
import {User} from "../models/user.model";
import fs from 'fs';
import {Profile} from "../models/profile.model";
import {Post} from "../models/post.model";

connectMongoose();

//
// export const initUser = async () => {
//     try {
//         // @ts-ignore
//         await User.deleteMany();
//         const user: string = 'user@abc.com';
//         const pass: string = 'password';
//         const fullname: string = 'Cole Adams'
//         const salt = await bcrypt.genSalt(10);
//         const password = await bcrypt.hash(pass, salt);
//         const userRegistered = await User.create({
//             username: user, password, fullname
//         });
//     } catch (e) {
//         console.log(e);
//     }
// };
//
// const profile = JSON.parse(fs.readFileSync(`${__dirname}/init-profile.json`
//     , 'utf-8'));
//
// export const initProfile = async () => {
//     try {
//         // @ts-ignore
//         await Profile.deleteMany();
//         const user = await User.findOne({'username': 'user@abc.com'});
//         // @ts-ignore
//         await Profile.create({...profile, user: user._id})
//     } catch (e) {
//         console.log(`error innitializing profile: ${e}`);
//     }
// };


const profiles = JSON.parse(fs.readFileSync(`${__dirname}/init-profile.json`
    , 'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/init-user.json`
    , 'utf-8'));

export const initUserWithProfile = async () => {
    // @ts-ignore
    await User.deleteMany();
    // @ts-ignore
    await Profile.deleteMany();
    // @ts-ignore
    await Post.deleteMany();

    for (let i = 0; i < profiles.length; i++) {
        try {
            const {username, password, fullname} = users[i];

            const salt = await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(password, salt);
            const userRegistered = await User.create({
                username, password: pass, fullname
            });
            await Profile.create({...profiles[i], user: userRegistered._id})
        } catch (e) {
            console.log(e);
        }
    }
};

