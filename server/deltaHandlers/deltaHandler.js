
'use strict'

const express = require('express');
const router = express.Router();

const calculateDelta = (arr1, arr2) => {
  const res = [];

  for(let i = 0; i < arr2.length; i++) {
    res[i] = Math.abs(+arr2[i] - +arr1[i]);
  }
  console.log(arr2.length);
  console.log(arr2);
  console.log(res);

  return res;
}

router.post('/', (req, res) => {
  console.log(req.body.int);
    console.log(req.body.func);
    console.log(req.body);
  res.send(calculateDelta(req.body.int, req.body.func));
});

module.exports = router;
