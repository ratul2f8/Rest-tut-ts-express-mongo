import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/sessionService";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", " ").split(' ')[1];

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = decode(accessToken);
  

  if (decoded) {
    //@ts-ignore
    req.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    //allocate new access token to the response token
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = decode(newAccessToken);

      //@ts-ignore
      req.user = decoded;
    }


    return next();
  }
  return next();
};
