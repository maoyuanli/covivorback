import {provideConfig} from "./keys";
import mongoose from 'mongoose';

const dbString = provideConfig().mongoDBConnStr;
const dbPass = provideConfig().mongoDBPassword;

const fullDBString = dbString.replace('<PASSWORD>', dbPass);


export const connectMongoose = () => {
    mongoose.connect(fullDBString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
};
