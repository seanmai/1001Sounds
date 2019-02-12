const keys = require("./keys");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Expresss
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgress
const { Pool } = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on("error", function(){
    console.log("Lost Postgres connection.");
});
// Table setup
// pgClient
//     .query("CREATE TABLE IF NOT EXISTS tracklists (number INT)")
//     .catch(err => console.log(err));

const redis = require("redis");
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();         // Need duplication because redis cannot listen and publish at same time

// Routing
app.get("/", function(req, res){
    res.send("Hello world");
});

app.get("/tracklists/all", async function(req, res){
    const tracklists = await pgClient.query("SELECT * from tracklists");
    res.send(tracklists.rows);
});

app.listen(8080, function(){
    console.log("Listening on port 8080");
});
