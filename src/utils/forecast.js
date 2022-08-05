const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/01c332f9f3cd7b0e10ca0bff8c49b037/'+latitude+','+longitude+'?units=si'
    request({url,json:true}, (error,{body})=> {
        if(error){
            callback('Unable to find Services',undefined )
        }        
        else if(body.error){
            callback('Error!!',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary +'    ' +'It is currently ' + body.currently.temperature + ' degrees out.      The high today is '+ body.daily.data[0].temperatureHigh +'  with a low of ' + body.daily.data[0].temperatureLow+' . There is a ' + body.currently.precipProbability + ' % chance of rain'
             )
        }
        })

}

module.exports = forecast