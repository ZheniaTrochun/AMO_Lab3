
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

module.exports = Sin2Interpolator;
