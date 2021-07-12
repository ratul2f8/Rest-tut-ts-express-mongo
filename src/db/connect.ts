import config from "config";
import log from "../logger";
import mongoose from "mongoose";

const connect = () => {
    const dbUri = config.get("dbUri") as string;

    return mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => log.info(`Successfully connected to the database.`))
    .catch((err) => {
        log.error("DB error: ", err);
        process.exit(1);
    });
};
export default connect;