const fs = require('fs')
const request = require('request')

const geocode = (address, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?country=us&access_token=pk.eyJ1IjoiMWxhbGl0cGF0aWRhciIsImEiOiJja2Z5b25yb24xd3AwMnF0OHdrY3cwaXdxIn0.xd59d8iUIRmfXhI5Wr5D4Q';
   console.log(url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to process your request try once to check your network connection', undefined)

        } else if (response.body.features.length === 0) {
            callback('put another address this is a wrong location', undefined)

        } else {
           return callback(undefined, {
                latitude: response.body.features[0].center[1], // this is stand for latitude 
                longitude: response.body.features[0].center[0], // this is stand for longitude
                location: response.body.features[0].place_name.slice(0, 8)
            })
        }
    })
}

const saying = (val) => {
    let result = 122 - val;
    return result;
}

module.exports = {
    geocode: geocode,
    saying: saying
}