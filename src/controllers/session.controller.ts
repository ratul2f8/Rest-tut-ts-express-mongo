import { updateSession, validatePassword } from "../services/userService";
import { Request, Response } from "express";
import { createAccessToken, createSession, findSessions } from "../services/sessionService";
import config from "config";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";

const refreshTokenTTL = config.get("refreshTokenTTL") as string;

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate email and password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  //create a session
  const session = await createSession({
    userId: user._id,
    userAgent: req.get("user-agent") || "",
  });

  //create access token
  const accessToken = createAccessToken({user: user, session: session});

  //create refresh token
  const refreshToken = sign(session, { expiresIn: refreshTokenTTL});

  //send the access token and refresh token
  return res.send({ accessToken, refreshToken });

}

export async function invalidateUserSessionHandler(req: Request, res: Response){

  const sessionId = get(req, "user.session")

  await updateSession({query: {_id: sessionId}, update: {valid: false}});

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response){
  const userId = get(req, "user._id");

  const sessions = await findSessions({user: userId, valid: true});

  return res.send(sessions);
}