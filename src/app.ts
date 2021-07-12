import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import healthCheckRouter from "./routes/healthcheck";
import usersRouter from "./routes/users";
import sessionsRouter from "./routes/sessions";
import postsRouter from "./routes/posts";
import { deserializeUser } from "./middlewares/deserializeUser";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router maps
app.use("/healthcheck", healthCheckRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/sessions", sessionsRouter);
app.use("/api/v1/posts", postsRouter);

app.listen(port, () => {
  log.info(`Server started at port: ${port}`);
  connect();
});
