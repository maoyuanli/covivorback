import {Feedback} from "../../models/feedback.model";
import {Request, Response} from "express";

export const handleFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await Feedback.create(req.body.feedback);
        // @ts-ignore
        const name: string = feedback.name;
        // @ts-ignore
        const email: string = feedback.email;
        // @ts-ignore
        const phone: string = feedback.phone;
        // @ts-ignore
        const comment: string = feedback.comment;
        res.status(200).json({
            success:
                `Feedback created successfully: ${name} | ${email} | ${phone} | ${comment}`
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};
