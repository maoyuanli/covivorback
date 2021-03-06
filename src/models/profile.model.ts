import mongoose, {Schema} from 'mongoose';

export const profileSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photoUrl: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    youtube: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedin: {
        type: String
    },
    instagram: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Profile = mongoose.model("Profile", profileSchema);
