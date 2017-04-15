
'use strict'

const utils = require(__base + 'utils/utils');

const splinesNum = 100;

class Interpolator {

  static interpolate(startPoint, endPoint, funcStr, nodes) {
    const xArrForInterpolation = [];

    const xArr = [];
    const yArr = [];

    const len = endPoint - startPoint;

    for(let i = startPoint; i <= endPoint; i += (len)/nodes) {
      xArrForInterpolation.splice(xArrForInterpolation.length, 0, utils.roundDoubleNum(i, 4));
    }

    for(let i = startPoint; i <= endPoint; i += (len)/splinesNum) {
      xArr.splice(xArr.length, 0, utils.roundDoubleNum(i, 4));

      yArr.splice(yArr.length, 0,
        Interpolator.NewtonFromStart(i, xArrForInterpolation.length - 1, xArrForInterpolation,
          utils.calculate(xArrForInterpolation, funcStr, nodes)));
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
  static NewtonFromStart(item, n, x, y) {

    // res - variable for result
    // f - temporary variable
    // den - temporary holder for multiplication results
    let res = 0;
    let f;
    let den;

    for(let i = 0; i < n; i++) {
      f = 0;
      for(let j = 0; j <= i; j++) {
        den = 1;
        for(let k = 0; k <= i; k++) {
          if(k != j) den *= (x[j] - x[k]);
        }
        f += y[j]/den;
      }

      for(let k = 0; k < i; k++) {
        f *= (item - x[k]);
      }
      res += f;
    }

    return res;
  }
}

module.exports = Interpolator;
