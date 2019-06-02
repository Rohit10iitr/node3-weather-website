const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/171a0d0e79135ec58a1fd6473f08fb44/' + latitude + ',' + longitude + '?units=si'
    request({url,json:true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " celsius. There is a " + body.currently.precipProbability + "% chance of rain");
        }
    })
}

module.exports = forecast