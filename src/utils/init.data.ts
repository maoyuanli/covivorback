import {connectMongoose} from '../config/dbconnect';
import bcrypt from "bcrypt";
import {User} from "../models/user.model";
import fs from 'fs';
import {Profile} from "../models/profile.model";
import {Post} from "../models/post.model";

connectMongoose();

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

            const randInt = Math.floor(Math.random() * 100);
            const randGender = randInt > 50 ? 'women' : 'men'
            const photoUrl = `https://randomuser.me/api/portraits/${randGender}/${randInt}.jpg`;

            await Profile.create({...profiles[i], photoUrl, user: userRegistered._id})
        } catch (e) {
            console.log(e);
        }
    }
};

