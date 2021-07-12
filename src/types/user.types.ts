import { Omit } from "lodash";
import { ISessionDocument } from "../model/session.model";
import { LeanDocument, UpdateQuery, FilterQuery } from "mongoose";
import { UserDocument } from "../model/user.model";


export interface ILoginCredentials {
  email: UserDocument["email"];
  password: string;
}

export interface ICreateSessionParams {
  userId: string;
  userAgent: string;
}

export interface ICreateAccessToken {
  user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    | Omit<ISessionDocument, "password">
    | LeanDocument<Omit<ISessionDocument, "password">>;
}

export interface IUpdateSessionParam{
  query: UpdateQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
}
