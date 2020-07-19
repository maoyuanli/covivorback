import mongoose, {Schema} from 'mongoose';

export const postSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

export const Post = mongoose.model("Post", postSchema);
