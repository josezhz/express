const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const MongoUtil = require("./MongoUtil.js");
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// !! ENABLE PROCESSING JSON DATA
app.use(express.json());
// !! ENABLE CORS
app.use(cors());

// SETUP END
async function main() {
    app.get('', function(req,res){
        res.send("Hello world")
    })
}
main();

// START SERVER
app.listen(3000, function(){console.log("Server started")})