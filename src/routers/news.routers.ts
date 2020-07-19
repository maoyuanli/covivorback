import express from 'express';
import {provideTopNews, searchNews} from "../controllers/news/news.controller";


export const topNewsRouter = express.Router();

topNewsRouter.route('/').get(provideTopNews);

export const searchNewsRouter = express.Router();

searchNewsRouter.route('/').get(searchNews);
