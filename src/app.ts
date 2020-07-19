import express, {Application} from 'express';
import morgan from 'morgan';
import {chatbotRouter} from './routers/chatbot.routers';
import {skillRouter} from './routers/skill.routers';
import {bindSkillExp, initExps, initOrders, initSkills, initUser} from './utils/init.data';
import cors from 'cors';
import bodyParser from 'body-parser';
import {expRouter} from "./routers/experience.routers";
import {userRouter} from "./routers/user.routers";
import {covid19Router} from "./routers/covid19.routers";
import {feedbackRouter} from "./routers/feedback.routers";
import {searchNewsRouter, topNewsRouter} from "./routers/news.routers";
import {stockquoteRouter} from "./routers/stockquote.routers";
import {tweetsRouter} from "./routers/tweets.routers";
import {getOrderRouter, setOrderRouter} from "./routers/order.routers";


export const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.options('*', cors());
app.use('/api/chatbot', chatbotRouter);
app.use('/api/skill', skillRouter);
app.use('/api/exp', expRouter);
app.use('/api/users', userRouter);
app.use('/api/covid19', covid19Router);
app.use('/api/feedback', feedbackRouter);
app.use('/api/topnews', topNewsRouter);
app.use('/api/searchnews', searchNewsRouter);
app.use('/api/quote', stockquoteRouter);
app.use('/api/tweet', tweetsRouter);
app.use('/api/setorder', setOrderRouter);
app.use('/api/getorder', getOrderRouter);

initSkills().then(r => initExps()).then(r => bindSkillExp()).then(r => initUser()).then(r => initOrders());


