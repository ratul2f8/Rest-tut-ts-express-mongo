import Session, { ISessionDocument } from "../model/session.model";
import { ICreateSessionParams, ICreateAccessToken } from "../types/user.types";
import { sign } from "../utils/jwt.utils";
import { decode } from "../utils/jwt.utils";
import { get } from "lodash";
import config from "config";
import { findUser } from "./userService";
import User from "../model/user.model";
import { FilterQuery } from "mongoose";

const ttl = config.get("accessTokenTTL") as string;

export async function createSession(param: ICreateSessionParams) {
  const { userAgent, userId } = param;
  const session = await Session.create({
    user: userId,
    userAgent,
  });
  return session.toJSON();
}

export function createAccessToken(param: ICreateAccessToken) {
  const { session, user } = param;
  return sign({ ...user, session: session._id }, { expiresIn: ttl });
}

export async function reIssueAccessToken(refreshToken: string) {
  //decode the refresh token
  const { decoded } = decode(refreshToken);
  if (!decoded || !get(decoded, "_id")) return false;

  //get the session
  const session = await Session.findById(get(decoded, "_id"));

  //check if the session is valid or not
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user._id });

  if (!user) return false;

  const accessToken = await createAccessToken({ session: session, user: user });

  return accessToken;
}

export async function findSessions(query: FilterQuery<ISessionDocument>){
  return await Session.find(query).lean();
}