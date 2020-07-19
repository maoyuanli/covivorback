import express from 'express';
import {provideTweets} from "../controllers/tweets/tweets.controller";

export const tweetsRouter = express.Router();

tweetsRouter.route('/').get(provideTweets);
