import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IPostDocument } from "../model/post.model";
export interface IFindPostParam{
    query: FilterQuery<IPostDocument>,
    options: QueryOptions
}
export interface IFindAndUpdateParam{
    query: FilterQuery<IPostDocument>,
    update: UpdateQuery<IPostDocument>,
    options: QueryOptions
}