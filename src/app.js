const path = require('path')  // this is the inbuild module of node 
const hbs = require('hbs')
const express = require('express')
const { ok } = require('assert')
const geocode = require('./weatherApi/geocode')
const { request } = require('http')
const forcast = require('./weatherApi/forcast')

const app = express()
const port = process.env.PORT || 3000

// define path for express
const publicDirectorypath = path.join(__dirname, '..', '/public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')
console.log(viewsPath)

//setup a static directory to serve
app.use(express.static(publicDirectorypath))  // it show the given file data at your given port

app.get('', (req, res) => {
    res.render('index', {
        name: 'lalit'
    })
})

// setup handelbar engine and views directory
// to set dynamic directory from hbs with express
app.set('view engine', 'hbs')
app.set('views', viewsPath) // set the another name of file name
hbs.registerPartials(partials)

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about-us',
        name: 'lalit patidar'
    })
})


app.get('/home', (req, res) => {
    res.render('home', {
        title: 'home',
        name: 'lalit patidar',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'this is error please put your address'
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
            console.log(error)
        } else {
            forcast.forcast(latitude, longitude, (error, { temperature, weather }) => {
                if (error) {
                    res.send({ error })
                }

                res.send({
                    temperature,
                    location,
                    weather,
                    address: req.query.address
                })
            })
        }

    })

})

app.get('/formData', (req, res) => {
    res.render('formData', {
        hello: 'what'
    })
})

app.get('/about/*', (req, res) => {
    res.render('error', {
        message: '404 there is no such article in the about page'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: '404 page is not found',
        link: '<a href = "/">try this</a>'
    })
})

app.listen(port, () => {
    console.log('server is running at port' + port)
})

