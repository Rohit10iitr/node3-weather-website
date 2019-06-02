const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) +'.json?access_token=pk.eyJ1Ijoicm9oaXQxMGlpdHIiLCJhIjoiY2p2dTdscGJzMTl4cDQ5b2U0ZmhidTQ1OCJ9.4BDd3x1FkUG_pMXFpx2uPQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to API server',undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name, latitude: body.features[0].center[1], longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode;