import { Request, Response, NextFunction, Router } from "express";
import { requiresUserProp } from "../middlewares/requiresUserProp";
import { validateRequest } from "../middlewares/validateRequest";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  getPostSchema,
} from "../schemas/posts.schema";
import {
  getPostHandler,
  deletePostHandler,
  updatePostHandler,
  createPostHandler,
} from "../controllers/posts.controller";

const postsRouter = Router();

postsRouter
  .all("/", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get("/:postId", validateRequest(getPostSchema), getPostHandler)
  .post(
    "/",
    [requiresUserProp, validateRequest(createPostSchema)],
    createPostHandler
  )
  .put(
    "/:postId",
    [requiresUserProp, validateRequest(updatePostSchema)],
    updatePostHandler
  )
  .delete(
    "/:postId",
    [requiresUserProp, validateRequest(deletePostSchema)],
    deletePostHandler
  );

export default postsRouter;
