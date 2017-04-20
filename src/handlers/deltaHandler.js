'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var calculateDelta = function calculateDelta(arr1, arr2) {
  var res = [];

  for (var i = 0; i < arr2.length; i++) {
    res[i] = Math.abs(+arr2[i] - +arr1[i]);
  }

  return res;
};

router.post('/', function (req, res) {
  res.send(calculateDelta(req.body.int, req.body.func));
});

module.exports = router;
