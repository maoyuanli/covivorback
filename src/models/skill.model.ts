import mongoose, {Schema} from "mongoose";


export const skillSchema: Schema = new mongoose.Schema({
    skillName: {type: String, required: true, unique: true},
    score: {type: String, required: true},
});

export const Skill = mongoose.model('Skill', skillSchema);


export interface SkillModel {
    skillName: string;
    score: number;
}
