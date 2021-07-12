import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    body: string()
      .min(120)
      .required("Content of the post must be 120 characters long."),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  params: object({
    postId: string().required(
      "Must include id of the post as suffix in request path."
    ),
  }),
  ...payload,
});

export const deletePostSchema = object({
  params: object({
    postId: string().required(
      "Must include id of the post as suffix in request path."
    ),
  }),
});

export const getPostSchema = object({
  params: object({
    postId: string().required(
      "Must include id of the post as suffix in request path."
    ),
  }),
});
