'use strict'

class Interpolator {
  static interpolate(intervalArr, callback) {
//    const inputArr = [];
console.log(intervalArr);
    const resultArr = [];

    resultArr[0] = [];
    resultArr[1] = [];

    for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += 0.1) {
      resultArr[0].splice(resultArr[0].length, 0, Math.round(i*10000)/10000);
    }

    for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += 0.01) {
      resultArr[1].splice(resultArr[1].length, 0, Interpolator.Newton(i, resultArr[0].length - 1, resultArr[0], callback(resultArr[0], 0.1), 0.1));
    }

    console.log(resultArr[1]);
    console.log(callback(resultArr[0], 0.01));

    return resultArr;
  }

  // Newton interpolation
  static Newton(x, n, MasX, MasY, step) {
    // creating temporary array
    let mas = [];
    for(let i = 0; i < n + 2; i++) {
      mas[i] = [];
    }

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < n + 1; j++) {
        mas[i][j] = i == 0 ? MasX[j] : MasY[j];
      }
    }

    let m = n;
    for (let i = 2; i < n + 2; i++) {
      for (let j = 0; j < m; j++) {
        mas[i][j] = mas[i - 1][j + 1] - mas[i - 1][j];
      }
      m--;
    }

    let dy0 = [];

    for (let i = 1; i <= n + 1; i++) {
      dy0[i-1] = mas[i][0];
    }

    let res = dy0[0];
    let xn = [];
    xn[0] = x - mas[0][0];

    for (let i = 1; i < n; i++) {
      let ans = xn[i - 1] * (x - mas[0][i]);
      xn[i] = ans;
      ans = 0;
    }

    let m1 = n + 1;
    let fact = 1;
    for (let i = 1; i < m1; i++) {
      fact = fact * i;
      res = res + (dy0[i] * xn[i - 1]) / (fact * Math.pow(step, i));
    }

    return res;
  }
}

module.exports = Interpolator;
