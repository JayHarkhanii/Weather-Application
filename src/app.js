const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()
//Define Paths for Express config
const dirpath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const PartialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(PartialPath)

//Setup static directory to serve
app.use(express.static(dirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Jay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       name:'Jay',
       title:'Help!' 
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
       }
       forecast(latitude,longitude,(error,ForecastData)=>{
           if(error){
            return res.send({
                error:error
            })           }
   
           res.send({
               forecast:ForecastData,
               location,
               address:req.query.address,
               
           })
           console.log({
            forecast:ForecastData,
            location,
            address:req.query.address,
            
        })
       })
    
   })
   
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Jay',
        title:'About!!'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(resq,res)=>{
    res.render('wrong',{
        text:'Page Not Found',
        title : 'Error Page'

    })
})



app.get('*',(resq,res)=>{
    res.render('error',{
        text:'Article Not Found',
        title : 'Article Page'

    })
})
app.listen(port,()=>{
    console.log('Server is up on port ',+port)
})