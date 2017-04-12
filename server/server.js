
'use strict'

global.__base = __dirname + '/';

const express = require('express');
const app = express();
const sinHandler = require('./handlers/sinHandler');
const sin2Handler = require('./handlers/sin2Handler');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/interpolate', sinHandler);
app.use('/interpolate', sin2Handler);

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});
