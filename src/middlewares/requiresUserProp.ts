import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

export const requiresUserProp = (req: Request, res: Response, next: NextFunction) => {
    const user = get(req, "user");

    if(!user){
        return res.sendStatus(401);
    }
    next();
}