import { DocumentDefinition } from "mongoose";
import Post,{ IPostDocument } from "../model/post.model";
import { IFindAndUpdateParam, IFindPostParam } from "../types/post.types";

export async function createPost(input: DocumentDefinition<IPostDocument>){
    return await Post.create(input);
}

export async function findPost(param: IFindPostParam){
    const { options, query } = param;
    const foundPost =  await Post.findOne(query, {}, options);
    return foundPost;
}

export async function findAndUpdate(param: IFindAndUpdateParam){
    const {options,query, update} = param;
    return await Post.updateOne(query, update,options);
}

export async function findAndDelete(postId: string){
    return await Post.deleteOne({ postId: postId});
}