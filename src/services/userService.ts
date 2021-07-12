import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import { ILoginCredentials, IUpdateSessionParam } from "../types/user.types";
import { omit } from "lodash";
import Session from "../model/session.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try{
        return await User.create(input);
    }
    catch(error){
        throw new Error(error + "");
    }
}

export async function findUser(query: FilterQuery<UserDocument>){
    return User.findOne(query).lean();
}

export async function validatePassword(credentials: ILoginCredentials) {
    const { email, password } = credentials;
    const user = await User.findOne({ email });
    if(!user){
        return false;
    }
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
        return false;
    }
    return omit(user.toJSON(),"password");
}

export async function updateSession(prop: IUpdateSessionParam){
    const { query, update} = prop;
    return Session.updateOne(query, update);
}