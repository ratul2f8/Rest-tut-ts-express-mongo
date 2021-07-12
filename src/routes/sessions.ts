import { Request, Response, NextFunction, Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createUserSessionSchema } from "../schemas/user.schema";
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "../controllers/session.controller";
import { requiresUserProp } from "../middlewares/requiresUserProp";

const sessionsRouter = Router();

sessionsRouter
  .all("/", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .post("/", validateRequest(createUserSessionSchema), createUserSessionHandler)
  .put("/", (req: Request, res: Response) => {
    req.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("Method not allowed!");
  })
  .get("/", requiresUserProp, getUserSessionsHandler)
  .delete("/", requiresUserProp, invalidateUserSessionHandler);

export default sessionsRouter;
