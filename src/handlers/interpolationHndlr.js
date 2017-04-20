'use strict';


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _newtonInterpolator = require(global.__base + 'interpolators/newtonInterpolator.js');

var _newtonInterpolator2 = _interopRequireDefault(_newtonInterpolator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  res.send(_newtonInterpolator2.default.interpolate(+req.body.startPoint, +req.body.endPoint, req.body.funcStr, +req.body.nodes));
});

module.exports = router;
