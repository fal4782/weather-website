const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Fal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Fal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:"Here is a list of FAQ that you may use for your help",
        title:'Help',
        name:'Fal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.add){
        return res.send({
            error:'You need to provide an address'
       })
    } 
    geocode(req.query.add, (err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send({error: err})
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({error})
            }
            res.send({                   
                address:req.query.add,
                location,
                forecast: data,
            })
        })
    })
})    

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Fal',
        errmsg:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Fal',
        errmsg:'Page not found'
    })
})

app.listen(3500,()=>{
  
    console.log('Server is up on port 3500.');
})