const express = require('express')
const hbs = require('hbs')

let app = express()

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('index.hbs')
})

app.listen(3000, ()=>console.log("Server started"))