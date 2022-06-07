const express = require('express')
const hbs = require('hbs')
const wax = require('wax-on')
const axios = require('axios')

let app = express()
app.set('view engine', 'hbs')
app.use(express.static('public'))
wax.on(hbs.handlebars)
wax.setLayoutPath('./views/layouts')

// ROUTES
app.get('/', function(req, res){
    res.render('home')
})

app.get('/report', function(req, res){
    res.render('report')
})

app.post('/report', async function(req, res) {
    console.log(req)
    await axios.post('faults.json', {
        'fault' : req.body.fault
    })
    res.redirect('/admin')
})

app.get('/admin', function(req, res){
    res.render('admin')
})

app.listen(3000, function(){console.log("Server started")})