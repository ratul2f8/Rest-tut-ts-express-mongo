import { Request, Response, Router } from "express";

const healthCheckRouter = Router();
healthCheckRouter.route("/").all((request: Request, response: Response) => {
  request.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end("Working fine!");
});

export default healthCheckRouter;
