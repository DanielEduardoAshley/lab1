//1-Import Express Library
//2-Initiate an Express App or Server
//3-Define a port
//4-Define your Server's Routes/Destination 
//Final-Get app server to listen to requests
const requests = require('request')
const math = require('./math.js')
const express = require('express');
const app = express();
const port = 3000;


const apiRequest = (url, cb) => {
    const request = new XMLHttpRequest
    request.open('GET', url)
    request.addEventListener('load', (e) => {
        const data = JSON.parse(e.currentTarget.response)
        cb(data)

    })
}


app.get('/math/add', (request, response) => {
    console.log(request.query)
    const keys = Object.keys(request.query)
    let sumString = ""
    let sum = 0
    for (let i = 0; i < keys.length; i++) {
        if ((typeof parseInt(request.query[keys[i]])) !== 'number') {
            return response.send({
                error: 'You passed a non-number value into the parameters.'
            })
        }
        sum += parseInt(request.query[keys[i]])
        if (i !== keys.length - 1) {
            sumString += request.query[keys[i]] + '+'
        }
        else {
            sumString += request.query[keys[i]]
        }
    }
    if (isNaN(sum)) {
        response.send({
            error: 'You passed a non-number value into the parameters.'
        })
    }
    else {
        response.contentType('json')
        response.send({ input: request.query, 'sumString': sumString, 'sum': sum })


    }


});



app.get('/math/subtract', (request, response) => {
    console.log(request.query)
    const keys = Object.keys(request.query)
    let subtrString = ""
    let subtr = parseInt(request.query[keys[0]])
    console.log(subtr)
    for (let i = 0; i < keys.length; i++) {

        if (i !== 0) {
            subtr -= parseInt(request.query[keys[i]])
        }
        if (i !== keys.length - 1) {
            subtrString += request.query[keys[i]] + '-'
        }
        else {
            subtrString += request.query[keys[i]]
        }
    }
    console.log(subtr)
    if (isNaN(subtr)) {
        response.send({
            error: 'You passed a non-number value into the parameters.'
        })
    }
    else {
        console.log(subtr)

        response.contentType('json')
        response.send({ input: request.query, 'subtrString': subtrString, 'difference': subtr })
    }
});

app.get('/math/multiply', (request, response) => {
    console.log(request.query)
    const keys = Object.keys(request.query)
    let multiString = ""
    let multi = 1
    for (let i = 0; i < keys.length; i++) {
        multi = multi * parseInt(request.query[keys[i]])
        if (i !== keys.length - 1) {
            multiString += request.query[keys[i]] + '*'
        }
        else {
            multiString += request.query[keys[i]]
        }

    }
    if (isNaN(multi)) {
        response.send({
            error: 'You passed a non-number value into the parameters.'
        })
    }
    else {
        response.contentType('json')
        response.send({ input: request.query, 'multiString': multiString, 'product': multi })
    }

});






app.get('/math/divide', (request, response) => {
    const keys = Object.keys(request.query)
    let quotientString = ""
    let divid = 1
    for (let i = 0; i < keys.length; i++) {
        divid = divid / parseInt(request.query[keys[i]])
        if (i !== keys.length - 1) {
            quotientString += request.query[keys[i]] + '/'
        }
        else {
            quotientString += request.query[keys[i]]
        }

    }
    if (isNaN(divid)) {
        response.send({
            error: 'You passed a non-number value into the parameters.'
        })
    }
    else {
        response.contentType('json')
        response.send({ input: request.query, 'quotientString': quotientString, 'quotient': divid })
    }

});


app.get('/gif', (req, res, ) => {


    console.log(req.query.search)

    requests(`http://api.giphy.com/v1/gifs/search?q=${req.query.search}&api_key=a2P1kDbJNBIyGKjF2wnIDcyCTZS1WXiY`, { encode: null }, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        const data = JSON.parse(body)

        const gifArray = [];
        data.data.forEach(currentGif => {
            const url = currentGif.images.original.url;
            gifArray.push(url);
        });
        res.send(gifArray)
    })
})






app.listen(port, () => {
    console.log('server is listening on', `${port}`)

})

