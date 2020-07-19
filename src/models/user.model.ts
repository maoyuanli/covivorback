import mongoose, {Schema} from 'mongoose';

export const userSchema: Schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

export const User = mongoose.model("User", userSchema);
