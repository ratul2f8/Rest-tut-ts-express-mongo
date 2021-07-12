import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { nanoid } from "nanoid";

export interface IPostDocument extends mongoose.Document{
    user: UserDocument["_id"],
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostDocument = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10)
        },
        title: {
            type: String,
            default: true
        },
        body: {
            type: String,
            default: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model<IPostDocument>("Post", PostDocument);

export default Post;

