import {Post} from "../models/post.model";
import {Request, Response} from "express";
import {User} from "../models/user.model";

export const createPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const post = await Post.create({
            title: req.body.post.title,
            text: req.body.post.text,
            // @ts-ignore
            user: req.user._id
        });
        const posts = await Post.find().populate("user", "-password").sort({date: 'desc'});
        res.status(200).json({
            status: 'success',
            posts: posts
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

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("user", "-password");
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
        await Post.findByIdAndDelete(req.params.id);
        const posts = await Post.find().populate("user", "-password");
        res.status(200).json({
            status: 'success',
            posts: posts
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
        const commentingUser = await User.findById(req.user._id);
        // @ts-ignore
        const comment = {
            user: commentingUser,
            text: req.body.text,
            // @ts-ignore
            fullname: commentingUser.fullname
        }
        // @ts-ignore
        post.comments.unshift(comment);
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


export const deleteComment = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.body.postId);
        // @ts-ignore
        const comment = post.comments.find(comment => comment._id.toString() === req.body.commentId);
        if (!comment) {
            return res.status(404).json({
                status: 'failed',
                message: 'comment not found'
            })
        }
        // @ts-ignore
        if (comment.user.toString() !== req.user._id) {
            return res.status(401).json({
                status: 'failed',
                message: 'user not authorized'
            })
        }
        // @ts-ignore
        post.comments = post.comments.filter(comment => comment._id.toString() !== req.body.commentId)
        // @ts-ignore
        await post.save();
        res.status(200).json({
            status: 'success',
            // @ts-ignore
            comments: post.comments
        })
    } catch (e) {
        res.status(400).json({
            status: 'operation failed',
            message: e
        })
    }
};
