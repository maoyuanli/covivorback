import mongoose, {Schema} from "mongoose";

export const feedbackSchema: Schema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    comment: {type: String}
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);

export interface FeedbackModel {
    name: string;
    email: string;
    phone: string;
    comment: string
}
