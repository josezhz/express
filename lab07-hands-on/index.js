const express = require('express')
const hbs = require('hbs')
const waxOn = require('wax-on')
const axios = require('axios')

let app = express()
app.set('view engine', 'hbs')
waxOn.on(hbs.handlebars)
waxOn.setLayoutPath('./views/layouts')
app.use(express.static('public'))

app.use(express.urlencoded({
    'extended': false
}))

const BASE_API_URL = "https://ckx-movies-api.herokuapp.com/"

// routes
app.get('/', function(req, res) {
    res.render('index')
})

app.get('/movies', async function(req, res) {
    let response = await axios.get(BASE_API_URL + 'movies')
    res.render('movies', {
        'movies': response.data
    })
})

app.get('/movies/create', function(req, res) {
    res.render('create_movie')
})

app.post('/movies/create', async function(req, res) {
    let title = req.body.title
    let plot = req.body.plot
    await axios.post(BASE_API_URL + "movie/create", {
        'title' : title,
        'plot' : plot
    })
    res.redirect('/movies')
})

app.get('/movies/edit', async function(req, res) {
    let response = await axios.get(BASE_API_URL + 'movies')
    res.render('edit', {
        'movies' : response.data
    })
})

app.get('/form/edit/:id', async function(req, res) {
    let movieId = req.params.id
    let response = await axios.get(BASE_API_URL + "movie/" + movieId)
    res.render('form_edit', {
        'oldTitle' : response.data.title,
        'oldPlot' : response.data.plot
    })
})

app.post('/form/edit/:id', async function(req, res) {
    let newTitle = req.body.newTitle
    let newPlot = req.body.newPlot
    let movieId = req.params.id
    let url = BASE_API_URL + "movie/" + movieId
    await axios.patch(url, {
        'title' : newTitle,
        'plot' : newPlot
    })
    res.redirect('/movies')
})

app.get('/form/delete/:id', async function(req, res) {
    let movieId = req.params.id
    let response = await axios.get(BASE_API_URL + "movie/" + movieId)
    res.render('form_delete', {
        'title' : response.data.title,
        'plot' : response.data.plot
    })
})

app.post('/form/delete/:id', async function(req, res) {
    let movieId = req.params.id
    await axios.delete(BASE_API_URL + "movie/" + movieId)
    res.redirect('/movies/edit')
})

app.listen(3000, function() {
    console.log("server started");
})