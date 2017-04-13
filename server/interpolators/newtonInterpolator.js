'use strict'

class Interpolator {
  static interpolate(intervalArr, callback) {
    const inputArr = [];
    console.log(intervalArr);
    const resultArr = [];

    resultArr[0] = [];
    resultArr[1] = [];

    for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += (intervalArr[1] - intervalArr[0])/10) {
      inputArr.splice(inputArr.length, 0, Math.round(i*10000)/10000);
    }

    for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += (intervalArr[1] - intervalArr[0])/100) {
      resultArr[0].splice(resultArr[0].length, 0, Math.round(i*10000)/10000);
      resultArr[1].splice(resultArr[1].length, 0, Interpolator.Newton(i, inputArr.length - 1, inputArr, callback(inputArr, (intervalArr[1] - intervalArr[0])/10), (intervalArr[1] - intervalArr[0])/10));
    }

    console.log(resultArr[1]);
    console.log(callback(resultArr[0], (intervalArr[1] - intervalArr[0])/100));

    return resultArr;
  }

  static interpolateFromStart(intervalArr, callback) {
    const inputArr = [];
    console.log(intervalArr);
    const resultArr = [];

    resultArr[0] = [];
    resultArr[1] = [];

    for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += (intervalArr[1] - intervalArr[0])/10) {
      inputArr.splice(inputArr.length, 0, Math.round(i*10000)/10000);
    }

    for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += (intervalArr[1] - intervalArr[0])/100) {
      resultArr[0].splice(resultArr[0].length, 0, Math.round(i*10000)/10000);
      resultArr[1].splice(resultArr[1].length, 0, Interpolator.NewtonFromStart(i, inputArr.length - 1, inputArr, callback(inputArr, (intervalArr[1] - intervalArr[0])/10)));
    }

    console.log(resultArr[1]);
    console.log(callback(resultArr[0], (intervalArr[1] - intervalArr[0])/100));

    return resultArr;
  }

  static NewtonfromStart(t, n, x, y) {
    let res = y[0];
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
        f *= (t - x[k]);
      }
      res += f;
    }

    return res;
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
