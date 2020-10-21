const request = require('request')

const forcast = (latitude, longitude, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=8c285df558eb859af082ced512890c18&query=' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect weather stack, please check your network connection at once', undefined)

        } else if (response.body.error) {
            callback('somthing went wrong', undefined)

        } else {
        callback(undefined, {
            temperature: response.body.current.temperature,
            huidity: response.body.current.humidity,
            weather: response.body.current.weather_descriptions[0]
            })   
        }   
    })
}

module.exports = {
    forcast:forcast
}
