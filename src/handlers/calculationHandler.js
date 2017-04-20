'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _utils = require(global.__base + 'utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  console.log(req.body);
  res.send(_utils2.default.calculate([+req.body.startPoint, +req.body.endPoint], req.body.funcStr, 100));
});

module.exports = router;
