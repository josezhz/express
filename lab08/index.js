const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
async function main() {
    /* 1. Setup Express */
    let app = express();
    // 1B. Setup view engine
    app.set('view engine', 'hbs');
    // 1C. Setup static folderrs
    app.use(express.static('public'));
    // 1D. Setup Wax On (for template inheritance)
    wax.on(hbs.handlebars);
    wax.setLayoutPath('views/layouts');
    // 1E. Enable forms
    app.use(express.urlencoded({ extended: false }));
    // 1F. Connect to Mongo
    const client = await MongoClient.connect(MONGO_URI, {
        "useUnifiedTopology": true
    });
    const db = client.db('sample_airbnb');

    /* 2. Routes */
    app.get('/', async function (req, res) {
        let data = await db.collection('listingsAndReviews').find({}).limit(10).toArray();
        res.send(data);
    });

    /* 3. Run server */
    app.listen(3000, function () { console.log("Server started") });
};
main();