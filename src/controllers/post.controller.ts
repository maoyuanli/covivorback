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

export const likePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.body.postId);
        // @ts-ignore
        if (post.likes
            // @ts-ignore
            .filter(like => like.user.toString() === req.user._id).length > 0) {
            return res.status(400).json({
                status: 'failed',
                message: 'post already liked'
            })
        }
        // @ts-ignore
        post.likes.push({user: req.user._id})
        // @ts-ignore
        await post.save();

        res.status(200).json({
            status: 'success',
            // @ts-ignore
            likes: post.likes
        })
    } catch (e) {
        res.status(400).json({
            status: 'operation failed',
            message: e
        })
    }
};

export const unlikePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.body.postId);
        // @ts-ignore
        if (post.likes
            // @ts-ignore
            .filter(like => like.user.toString() === req.user._id).length > 0) {
            // @ts-ignore
            post.likes = post.likes.filter(like => like.user.toString() !== req.user._id)
        }
        // @ts-ignore
        await post.save();
        res.status(200).json({
            status: 'success',
            // @ts-ignore
            likes: post.likes
        })
    } catch (e) {
        res.status(400).json({
            status: 'operation failed',
            message: e
        })
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const post = await Post.findById(req.body.postId);
        // @ts-ignore
        const commentingUser = req.user;
        console.log(commentingUser._id)
        const comment = {
            user: commentingUser,
            text: req.body.text,
            fullname: commentingUser.fullname
        }
        // @ts-ignore
        post.comments.push(comment);
        // @ts-ignore
        post.save()
        res.status(200).json({
            status: 'success',
            // @ts-ignore
            comments: post.comments
        })
    } catch (err) {
        res.status(400).json({
            status: 'operation failed',
            message: err
        })
    }
};
