import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import log from "../logger";

const privateKey = config.get("jwtSecret") as string;

export function sign(object: Object, options?: SignOptions | undefined){
    return jwt.sign(object, privateKey, options);   
}
export function decode(token: string){
    try{
        const decoded = jwt.verify(token, privateKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    }catch(error){
        log.error((<Error>error).message);
        return {
            valid: false,
            expired: (<Error>error).message === "jwt expired",
            decoded: null
        }
    }
}

