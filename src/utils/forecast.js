const request = require('request')


const forecast=(lat,lon,callback)=>{
    // console.log(lat,lon); 
    const url = 'http://api.weatherstack.com/current?access_key=d92a7f817a21cc2a47833f5ac9137430&query='+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'&units=m'

    request({url,json:true},(err,{body})=>{
        if(err){
            callback("Unable to connect to the network",undefined)
        } else if(body.error){
            callback("Invalid location",undefined)
        } else {
            callback(undefined,body.current.weather_descriptions+". It is currently "+body.current.temperature+" degrees out. There is a "+body.current.precip+"% chance of rain."
            )
        }
    })

}


module.exports=forecast