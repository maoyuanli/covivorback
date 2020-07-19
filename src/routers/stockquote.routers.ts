import express from 'express';
import {provideStockQuote} from "../controllers/stockquote/stockquote.controller";

export const stockquoteRouter = express.Router();

stockquoteRouter.route('/').get(provideStockQuote);
