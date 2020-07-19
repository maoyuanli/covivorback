import {Post} from "../models/post.model";
import {Request, Response} from "express";

export const createPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const post = await Post.create({
            title: req.body.post.title,
            text: req.body.post.text,
            // @ts-ignore
            user: req.user._id
        });
        res.status(200).json({
            status: 'success',
            order: post
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};

export const getPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userID = req.user._id;
        const posts = await Post.find({'user': userID});
        res.status(200).json({
            posts: posts
        });

    } catch (err) {
        res.status(400).json({
            status: 'not found',
            message: err
        })
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const postId = req.body.postId;
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'success',
        })
    } catch (e) {
        res.status(400).json({
            status: 'operation failed',
            message: e
        })
    }
}
