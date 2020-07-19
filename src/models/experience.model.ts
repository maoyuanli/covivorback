import mongoose, {Schema} from "mongoose";
import {Skill, SkillModel} from "./skill.model";

export const experienceSchema: Schema = new mongoose.Schema({
    companyName: {type: String, required: true},
    role: {type: String, required: true},
    years: {type: Number, required: true},
    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }]
});

export const Experience = mongoose.model('Experience', experienceSchema);

export interface ExperienceModel {
    companyName: string;
    role: string;
    years: number;
    skills?: SkillModel[]
}
