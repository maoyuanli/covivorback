import {Skill} from '../../models/skill.model';
import {Request, Response} from 'express';

export const addSkill = async (req: Request, res: Response) => {
    try {
        const skillAdded = await Skill.create(req.body);
        res.status(200).json({
            status: 'skill added',
            data: {
                skill: skillAdded
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};

export const findSkillByName = async (req: Request, res: Response) => {
    try {
        const targetName = req.params.name;
        const skill = await Skill.find({
            skillName: targetName
        });
        res.status(200).json({
            status: 'success',
            data: {
                skill: skill
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'not found',
            message: err
        })
    }
};

export const updateSkill = async (req: Request, res: Response) => {
    try {
        const filter = {skillName: req.body.skillName};
        const update = {score: req.body.score};
        const options = {new: true, upsert: true, runValidators: true};
        const skillUpdated = await Skill.findOneAndUpdate(
            filter, update, options
        );
        res.status(200).json({
            status: 'success',
            data: {
                skill: skillUpdated
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};

export const getAllSkills = async (req: Request, res: Response) => {
    try {
        const skills = await Skill.find()
            .select('-_id -__v');
        res.status(200).json({
            status: 'success',
            data: {
                skills
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'not found',
            message: err
        })
    }
};

