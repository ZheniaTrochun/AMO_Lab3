
global.__base = __dirname + '/';

import express from 'express';

import interpolationHndlr from './handlers/interpolationHndlr';

import calculationHandler from './handlers/calculationHandler';

import deltaHandler from './handlers/deltaHandler';

const app = express();

// body parser
import bodyParser from 'body-parser';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use((req, res, next) => {
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

app.use(express.static('viev/Template'));

app.use('/interpolate', interpolationHndlr);

app.use('/calculate', calculationHandler);

app.use('/delta', deltaHandler);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
