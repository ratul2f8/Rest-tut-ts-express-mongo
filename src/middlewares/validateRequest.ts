import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { AnySchema } from "yup";

export const validateRequest = (schema: AnySchema) => async(req: Request, res: Response, next: NextFunction) => {
    try{
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        return next();
    }catch(err){
        log.error(err + "");
        return res.status(400).send(err);
    }
}