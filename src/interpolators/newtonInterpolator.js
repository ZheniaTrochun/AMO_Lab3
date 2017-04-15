
'use strict';

const utils = require(__base + 'utils/utils');

const splinesNum = 100;

class Interpolator {

  static interpolate(startPoint, endPoint, funcStr, nodes) {
    const xArrForInterpolation = [];

    const xArr = [];
    const yArr = [];

    const len = endPoint - startPoint;

    for (let i = startPoint; i <= endPoint; i += len / nodes) {
      xArrForInterpolation.splice(xArrForInterpolation.length, 0, utils.roundDoubleNum(i, 4));
    }

    for (let i = startPoint; i <= endPoint; i += len / splinesNum) {
      xArr.splice(xArr.length, 0, utils.roundDoubleNum(i, 4));

      yArr.splice(yArr.length, 0, Interpolator.NewtonFromStart(i, xArrForInterpolation.length - 1, xArrForInterpolation, utils.calculate(xArrForInterpolation, funcStr, nodes)));
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
  */
  static NewtonFromStart(item, n, x, y) {
    let res = 0;
    let f;
    let den;

    for (let i = 0; i < n; i++) {
      f = 0;
      for (let j = 0; j <= i; j++) {
        den = 1;
        for (let k = 0; k <= i; k++) {
          if (k != j) den *= x[j] - x[k];
        }
        f += y[j] / den;
      }

      for (let k = 0; k < i; k++) {
        f *= item - x[k];
      }
      res += f;
    }

    return res;
  }
  //
  // // Newton interpolation
  // static Newton(x, n, MasX, MasY, step) {
  //   // creating temporary array
  //   let mas = [];
  //   for(let i = 0; i < n + 2; i++) {
  //     mas[i] = [];
  //   }
  //
  //   for (let i = 0; i < 2; i++) {
  //     for (let j = 0; j < n + 1; j++) {
  //       mas[i][j] = i == 0 ? MasX[j] : MasY[j];
  //     }
  //   }
  //
  //   let m = n;
  //   for (let i = 2; i < n + 2; i++) {
  //     for (let j = 0; j < m; j++) {
  //       mas[i][j] = mas[i - 1][j + 1] - mas[i - 1][j];
  //     }
  //     m--;
  //   }
  //
  //   let dy0 = [];
  //
  //   for (let i = 1; i <= n + 1; i++) {
  //     dy0[i-1] = mas[i][0];
  //   }
  //
  //   let res = dy0[0];
  //   let xn = [];
  //   xn[0] = x - mas[0][0];
  //
  //   for (let i = 1; i < n; i++) {
  //     let ans = xn[i - 1] * (x - mas[0][i]);
  //     xn[i] = ans;
  //     ans = 0;
  //   }
  //
  //   let m1 = n + 1;
  //   let fact = 1;
  //   for (let i = 1; i < m1; i++) {
  //     fact = fact * i;
  //     res = res + (dy0[i] * xn[i - 1]) / (fact * Math.pow(step, i));
  //   }
  //
  //   return res;
  // }
}

module.exports = Interpolator;