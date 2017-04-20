'use strict';
global.__base = __dirname + '/';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _interpolationHndlr = require('./handlers/interpolationHndlr');

var _interpolationHndlr2 = _interopRequireDefault(_interpolationHndlr);

var _calculationHandler = require('./handlers/calculationHandler');

var _calculationHandler2 = _interopRequireDefault(_calculationHandler);

var _deltaHandler = require('./handlers/deltaHandler');

var _deltaHandler2 = _interopRequireDefault(_deltaHandler);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var app = _express();

// body parser

app.use(_bodyParser2.default.json()); // support json encoded bodies
app.use(_bodyParser2.default.urlencoded({ extended: true })); // support encoded bodies

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

app.use(_express.static('/home/zhenia/lab_amo_3/viev/Template'));

app.use('/interpolate', _interpolationHndlr);

app.use('/calculate', _calculationHandler);

app.use('/delta', _deltaHandler);

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});
