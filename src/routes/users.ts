import {  Request, Response, NextFunction, Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";
import { validateRequest } from "../middlewares/validateRequest";

const usersRouter = Router();

usersRouter
  .all("/", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .post("/", validateRequest(createUserSchema), createUserHandler)
  .put("/", (req: Request, res: Response, next: NextFunction) => {
    req.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("Method not allowed!");
  })
  .get("/", (req: Request, res: Response, next: NextFunction) => {
    req.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("Method not allowed!");
  })
  .delete("/", (req: Request, res: Response, next: NextFunction) => {
    req.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("Method not allowed!");
  });

export default usersRouter;
