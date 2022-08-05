const request = require('request')
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiamF5MTYxMTEiLCJhIjoiY2p3cWF5aGNvMTg2ZTN5bGVybnE0MmtodCJ9.ZFDd64o3DVxXTDeR45jvAw"
    request({url,json:true},(error,{body})=>{

    if (error){
        callback('Unable to connect to Location Services',undefined)
    }
    else if(body.features.length === 0 ){
        callback('Error!!!!',undefined)
    }
    else{
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
        })
    }
})
}

module.exports = geocode
