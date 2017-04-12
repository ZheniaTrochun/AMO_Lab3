
'use strict'

const newtonInterpolator = require('./newtonInterpolator.js');

class SinInterpolator extends newtonInterpolator {
  static interpolate(intervalArr) {
    return super.interpolate(intervalArr, this.calculate);
  }

  static calculate(inputArr, step) {
    const arr = [];
    for(let i = inputArr[0]; i <= inputArr[inputArr.length - 1]; i += step) {
      arr.splice(arr.length, 0, Math.sin(i));
    }

    return arr;
  }
}

console.log(SinInterpolator.interpolate([0, 1]));
