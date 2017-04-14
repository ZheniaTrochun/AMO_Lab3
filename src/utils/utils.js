
'use strict';

const mathjs = require('mathjs');

class Utils {
  static calculate(inputArr, funcStr, nodes) {
    const arr = [];
    var f = mathjs.parse(funcStr);

    for (let i = inputArr[0]; i <= inputArr[inputArr.length - 1]; i += (inputArr[inputArr.length - 1] - inputArr[0]) / nodes) {
      arr.splice(arr.length, 0, f.eval({ x: i }));
    }

    return arr;
  }

  static roundDoubleNum(number, afterDot) {
    return Math.round(number * Math.pow(10, afterDot)) / Math.pow(10, afterDot);
  }
}

module.exports = Utils;