'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require(global.__base + 'utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var splinesNum = 100;

var Interpolator = function () {
  function Interpolator() {
    _classCallCheck(this, Interpolator);
  }

  _createClass(Interpolator, null, [{
    key: 'interpolate',
    value: function interpolate(startPoint, endPoint, funcStr, nodes) {
      var xArrForInterpolation = [];

      var xArr = [];
      var yArr = [];

      var len = endPoint - startPoint;

      for (var i = startPoint; i <= endPoint; i += len / nodes) {
        xArrForInterpolation.splice(xArrForInterpolation.length, 0, _utils2.default.roundDoubleNum(i, 4));
      }

      for (var _i = startPoint; _i <= endPoint; _i += len / splinesNum) {
        xArr.splice(xArr.length, 0, _utils2.default.roundDoubleNum(_i, 4));

        yArr.splice(yArr.length, 0, Interpolator.NewtonFromStart(_i, xArrForInterpolation.length - 1, xArrForInterpolation, _utils2.default.calculate(xArrForInterpolation, funcStr, nodes)));
      }

      return [xArr, yArr];
    }

    /**
      * method for gettin y-coordinate of interpolated function with x-coordinate
      *
      * item - x coordinate of interpolation dot
      * n - number of interpolation nodes
      * x - array with x-coordinates of interpolation nodes
      * y - array with y-coordinates of interpolation nodes
      *
      * for more info and explanation of interpolation algo, go to https://en.wikipedia.org/wiki/Newton_polynomial
    */

  }, {
    key: 'NewtonFromStart',
    value: function NewtonFromStart(item, n, x, y) {

      // res - variable for result
      // f - temporary variable
      // den - temporary holder for multiplication results
      var res = 0;
      var f = void 0;
      var den = void 0;

      for (var i = 0; i < n; i++) {
        f = 0;
        for (var j = 0; j <= i; j++) {
          den = 1;
          for (var k = 0; k <= i; k++) {
            if (k != j) den *= x[j] - x[k];
          }
          f += y[j] / den;
        }

        for (var _k = 0; _k < i; _k++) {
          f *= item - x[_k];
        }
        res += f;
      }

      return res;
    }
  }]);

  return Interpolator;
}();

exports.default = Interpolator;
