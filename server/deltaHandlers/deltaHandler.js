
'use strict'

const express = require('express');
const router = express.Router();

const calculateDelta = (arr1, arr2) => {
  const res = [];

  for(let i = 0; i < arr2.length; i++) {
    res[i] = Math.abs(+arr2[i] - +arr1[i]);
  }

  return res;
}

router.post('/', (req, res) => {
  res.send(calculateDelta(req.body.int, req.body.func));
});

module.exports = router;
