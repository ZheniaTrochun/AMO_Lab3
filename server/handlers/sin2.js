// 'use strict'
//
// class Interpolator {
//   static interpolate(intervalArr) {
//     const inputArr = [];
//     const resultArr = [];
//
//     for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += 0.1) {
//       inputArr.splice(inputArr.length, 0, i);
//     }
//
//     for(let i = intervalArr[0]; i <= (intervalArr[1] - intervalArr[0]); i += 0.01) {
//       resultArr.splice(resultArr.length, 0, Interpolator.Newton(i, inputArr.length - 1, inputArr, Interpolator.calculate(inputArr, 0.1), 0.1));
//     }
//
//     console.log(resultArr);
//     console.log(Interpolator.calculate(inputArr, 0.01));
//
//     return resultArr;
//   }
//
//   // Newton interpolation
//   static Newton(x, n, MasX, MasY, step) {
//     // creating temporary array
//     let mas = [];
//     for(let i = 0; i < n + 2; i++) {
//       mas[i] = [];
//     }
//
//     for (let i = 0; i < 2; i++) {
//       for (let j = 0; j < n + 1; j++) {
//         // if (i == 0)
//         mas[i][j] = i == 0 ? MasX[j] : MasY[j];
//         // else if (i == 1)
//         //     mas[i][j] = MasY[j];
//       }
//     }
//
//     let m = n;
//     for (let i = 2; i < n + 2; i++) {
//       for (let j = 0; j < m; j++) {
//         mas[i][j] = mas[i - 1][j + 1] - mas[i - 1][j];
//       }
//       m--;
//     }
//
//     let dy0 = [];
//
//     for (let i = 1; i <= n + 1; i++) {
//       dy0[i-1] = mas[i][0];
//     }
//
//     let res = dy0[0];
//     let xn = [];
//     xn[0] = x - mas[0][0];
//
//     for (let i = 1; i < n; i++) {
//       let ans = xn[i - 1] * (x - mas[0][i]);
//       xn[i] = ans;
//       ans = 0;
//     }
//
//     let m1 = n + 1;
//     let fact = 1;
//     for (let i = 1; i < m1; i++) {
//       fact = fact * i;
//       res = res + (dy0[i] * xn[i - 1]) / (fact * Math.pow(step, i));
//     }
//
//     return res;
//   }
//
//   static calculate(inputArr, step) {
//     const arr = [];
//     for(let i = inputArr[0]; i <= inputArr[inputArr.length - 1]; i += step) {
//       arr.splice(arr.length, 0, Math.pow(Math.sin(i), 2));
//     }
//
//     return arr;
//   }
// }
//
//
// // Interpolator.interpolate([0, 1], 0.45);
// //console.log(Interpolator.Newton(0.5, 10, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], costyl(), 0.1));
// //console.log(Math.pow(Math.sin(0.5), 2));
//
// Interpolator.interpolate([0, 1]);

'use strict'

const newtonInterpolator = require('./newtonInterpolator.js');

class Sin2Interpolator extends newtonInterpolator {
  static interpolate(intervalArr) {
    return super.interpolate(intervalArr, this.calculate);
  }

  static calculate(inputArr, step) {
    const arr = [];
    for(let i = inputArr[0]; i <= inputArr[inputArr.length - 1]; i += step) {
      arr.splice(arr.length, 0, Math.pow(Math.sin(i), 2));
    }

    return arr;
  }
}

Sin2Interpolator.interpolate([0, 1]);
