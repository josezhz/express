const express = require('express')

let app = express()

app.get('/', function(req, res) {
    res.send("<h1>Hello from Express</h1>")
})

app.listen(3000, function() {console.log("Server started")})