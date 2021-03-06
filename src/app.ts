import express, {Application} from 'express';
import morgan from 'morgan';
import {initPosts, initUserWithProfile} from './utils/init.data';
import cors from 'cors';
import bodyParser from 'body-parser';
import {userRouter} from "./routers/user.routers";
import {profileRouter} from "./routers/profile.routers";
import {postRouter} from "./routers/post.router";

require('./utils/cache')

export const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.options('*', cors());
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);

initUserWithProfile().then(r => {
    initPosts()
}).then(r => {
});


