import {Experience} from "../../models/experience.model";
import {Request, Response} from 'express';

export const getAllExps = async (req: Request, res: Response) => {
    try {
        const exps = await Experience.find()
            .select('-_id -__v')
            .populate('skills', '-_id -__v');
        res.status(200).json({
            status: 'success',
            data: {
                exps
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'not found',
            message: err
        })
    }
};
