const express = require('express')
const hbs = require('hbs')
const wax = require('wax-on')

let app = express()
app.set('view engine', 'hbs')
app.use(express.static('public'))
wax.on(hbs.handlebars)
wax.setLayoutPath('./views/layouts')
/**/
app.get('/', (req, res)=>{
    res.render('index')
})
/**/
app.listen(3000, ()=>console.log("Server started"))