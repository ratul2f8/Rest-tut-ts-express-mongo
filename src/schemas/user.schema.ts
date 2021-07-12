import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be of 6 characters long")
      .matches(
        /^[a-zA-Z0-9_,-]*$/,
        "Password can only contain latin characters"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Password don't match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be of 6 characters long")
      .matches(
        /^[a-zA-Z0-9_,-]*$/,
        "Password can only contain latin characters"
      ),
  }),
});
