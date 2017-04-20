'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'calculate',
    value: function calculate(inputArr, funcStr, nodes) {
      var arr = [];
      var f = _mathjs2.default.parse(funcStr);

      for (var i = inputArr[0]; i <= inputArr[inputArr.length - 1]; i += (inputArr[inputArr.length - 1] - inputArr[0]) / nodes) {
        arr.splice(arr.length, 0, f.eval({ x: i }));
      }

      return arr;
    }
  }, {
    key: 'roundDoubleNum',
    value: function roundDoubleNum(number, afterDot) {
      return Math.round(number * Math.pow(10, afterDot)) / Math.pow(10, afterDot);
    }
  }]);

  return Utils;
}();

exports.default = Utils;