import {Router} from "express";
import {auth} from "../utils/auth";
import {createPost, deletePost, getPost, likePost} from "../controllers/post.controller";


export const postRouter = Router();

postRouter.route('/create').post(auth, createPost)

postRouter.route('/get').get(auth, getPost)

postRouter.route('/delete').delete(auth, deletePost)

postRouter.route('/like').put(auth, likePost)