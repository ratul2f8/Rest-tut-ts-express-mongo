import { Request, Response, NextFunction } from "express";
import {
  createPost,
  findAndDelete,
  findAndUpdate,
  findPost,
} from "../services/postService";
import { get } from "lodash";
import log from "../logger";

export async function createPostHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = get(req, "user._id");
  const body = req.body;
  const post = await createPost({ ...body, user: userId });
  return res.send(post);
}
export async function updatePostHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId = get(req, "params.postId") as string;
  const post = await findPost({
    query: { postId: postId },
    options: { lean: true },
  });
  if (!post) {
    return res.sendStatus(404);
  }
  const userId = get(req, "user._id") as string;
  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }
  const updatedPost = await findAndUpdate({
    query: { postId: postId },
    update: req.body,
    options: { new: true },
  });

  if (!updatedPost) {
    return res.sendStatus(500);
  }

  return res.send(updatedPost);
}
export async function deletePostHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId = get(req, "params.postId") as string;
  const post = await findPost({
    query: { postId: postId },
    options: { lean: true },
  });
  if (!post) {
    return res.sendStatus(404);
  }
  const userId = get(req, "user._id") as string;
  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }
  try {
    await findAndDelete(postId);
    return res.sendStatus(200);
  } catch (error) {
    log.error((<Error>error).message);

    return res.sendStatus(500);
  }
}
export async function getPostHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId = get(req, "params.postId") as string;
  const post = await findPost({
    query: { postId: postId },
    options: { lean: true },
  });
  if (!post) {
    return res.sendStatus(404);
  }
  return res.send(post);
}
