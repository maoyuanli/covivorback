import fs from 'fs';
import {Skill, SkillModel} from '../models/skill.model';
import {connectMongoose} from '../config/dbconnect';
import {Experience, ExperienceModel} from "../models/experience.model";
import bcrypt from "bcrypt";
import {User} from "../models/user.model";
import {Order, OrderModel} from "../models/order.model";

connectMongoose();

const skills: SkillModel[] = JSON.parse(fs.readFileSync(`${__dirname}/preset-skills.json`, 'utf-8'));

const skillExpMap: Map<string, string[]> = new Map();
skillExpMap.set('Bulls Financial', ['java', 'javascript', 'python']);
skillExpMap.set('Trout Tech', ['javascript', 'python']);
skillExpMap.set('Lion Bank', ['java', 'sql']);

export const initSkills = async () => {
    try {
        // @ts-ignore
        await Skill.deleteMany();
        for (let skill of skills) {
            const filter = {skillName: skill.skillName};
            const update = {score: skill.score};
            const options = {new: true, upsert: true, runValidators: true};
            await Skill.findOneAndUpdate(
                filter, update, options
            )
        }
    } catch (e) {
        console.log(e);
    }
};

const exps: ExperienceModel[] = JSON.parse(fs.readFileSync(`${__dirname}/preset-experience.json`, 'utf-8'));

export const initExps = async () => {
    try {
        // @ts-ignore
        await Experience.deleteMany();
        for (let exp of exps) {
            const filter = {companyName: exp.companyName};
            const update = {role: exp.role, years: exp.years};
            const options = {new: true, upsert: true, runValidators: true};
            await Experience.findOneAndUpdate(
                filter, update, options
            )
        }
    } catch (e) {
        console.log(e);
    }
};

export const bindSkillExp = async () => {
    const skills = await Skill.find();
    const exps = await Experience.find();
    for (let exp of exps) {
        for (let skill of skills) {
            // @ts-ignore
            if (skillExpMap.get(exp.companyName).includes(skill.skillName)) {
                await Experience.findOneAndUpdate(
                    // @ts-ignore
                    {companyName: exp.companyName},
                    {$addToSet: {skills: skill._id}}
                )
            }
        }
    }
};

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

const orders: OrderModel[] = JSON.parse(fs.readFileSync(`${__dirname}/preset-orders.json`, 'utf-8'));

export const initOrders = async () => {
    try {
        // @ts-ignore
        await Order.deleteMany();
        const user = await User.findOne({'username': 'user@abc.com'});
        for (let order of orders) {
            // @ts-ignore
            await Order.create({...order, user: user._id})
        }
    } catch (e) {
        console.log(e);
    }
};
