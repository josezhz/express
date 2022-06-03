const express = require('express')

let app = express()

app.get('/hello/:name', function(req, res) {
    let name = req.params.name;
    res.send("Hi, " + name);
})

app.listen(3000, function() { console.log("Server started") })