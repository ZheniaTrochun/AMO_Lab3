
'use strict'

global.__base = __dirname + '/';

const express = require('express');

const sinHandler = require('./handlers/sinHandler');
const sin2Handler = require('./handlers/sin2Handler');

const sinCalculationHandler = require('./calculationHandlers/sinHandler');
const sin2CalculationHandler = require('./calculationHandlers/sin2Handler');

const deltaHandler = require('./deltaHandlers/deltaHandler');

const app = express();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/interpolate', sinHandler);
app.use('/interpolate', sin2Handler);

app.use('/calculate', sinCalculationHandler);
app.use('/calculate', sin2CalculationHandler);

app.use('/delta', deltaHandler);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
