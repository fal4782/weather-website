const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaHJpdGlrYSIsImEiOiJjbGx1azZ5eGExOTZrM2hucmx0YWtscGtmIn0.SNlB-1Fb8VoYf9ctbT7apg&limit=1'

    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to location services!", undefined)
        } else if(body.features.length===0){
            callback("Unable to find location",undefined)
        } else {
            callback(undefined, {
                longitude: body.features['0'].center['0'],
                latitude: body.features['0'].center['1'],
                location: body.features['0'].place_name
            })
        }
    })

}



module.exports = geocode