const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views locaton
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Provide server access to static files
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        name: 'Rohit Doshi',
        title:'Weather Application'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name: 'Rohit Doshi',
        title:'About'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        text:'Contact Rohit for help',
        name:'Rohit Doshi'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, response) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res) => {
    res.render('error',{
        errorHelp:'Help page not found',
        name:'Rohit Doshi',
        title: 'Help Request Error page'
})
})

app.get('*',(req,res) => {
    res.render('error',{
        error:'My 404 page',
        name:'Rohit Doshi',
        title: 'Page Not Found Error page'
    })
})

app.get('*',(req,res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
});