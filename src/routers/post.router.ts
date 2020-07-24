import {Router} from "express";
import {auth} from "../utils/auth";
import {
    createComment,
    createPost,
    deleteComment,
    deletePost,
    getAllPosts,
    getPost,
    likePost,
    unlikePost
} from "../controllers/post.controller";


export const postRouter = Router();

postRouter.route('/create').post(auth, createPost)

postRouter.route('/get').get(auth, getPost)

postRouter.route('/getall').get(getAllPosts)

postRouter.route('/delete/:id').delete(auth, deletePost)

postRouter.route('/like').put(auth, likePost)

postRouter.route('/unlike').put(auth, unlikePost)

postRouter.route('/comment').put(auth, createComment)

postRouter.route('/uncomment').put(auth, deleteComment)
