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

    const randIntUsed: Array<number> = [];
    for (let i = 0; i < profiles.length; i++) {
        try {
            const {username, password, fullname} = users[i];

            const salt = await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(password, salt);
            const userRegistered = await User.create({
                username, password: pass, fullname
            });


            let randInt = Math.floor(Math.random() * 100);
            while (randIntUsed.includes(randInt)) {
                randInt = Math.floor(Math.random() * 100);
            }
            randIntUsed.push(randInt);
            const randGender = randInt > 50 ? 'women' : 'men'
            const photoUrl = `https://randomuser.me/api/portraits/${randGender}/${randInt}.jpg`;

            await Profile.create({...profiles[i], photoUrl, user: userRegistered._id})
        } catch (e) {
            console.log(e);
        }
    }
};

const posts = JSON.parse(fs.readFileSync(`${__dirname}/init-post.json`
    , 'utf-8'));

export const initPosts = async () => {
    const users = await User.find();
    for (let i = 0; i < posts.length; i++) {
        posts[i].user = users[i]._id;
        posts[i].comments[0].user = users[3]._id;
        // @ts-ignore
        posts[i].comments[0].fullname = users[3].fullname;
        await Post.create(posts[i])
    }
};
