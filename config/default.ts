//our default configuration options goes here
export default {
    port: process.env.port || 1337,
    host: "localhost",
    dbUri: "mongodb://localhost:27017/posts-rest",
    saltWorkFactor: 10,
    jwtSecret: "Hello world",
    accessTokenTTL: "15m",
    refreshTokenTTL : "1y"
}