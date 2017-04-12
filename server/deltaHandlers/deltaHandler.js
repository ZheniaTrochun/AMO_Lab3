
'use strict'

const express = require('express');
const router = express.Router();

const calculateDelta = (arr1, arr2) => {
  const res = [];

  for(let i = 0; i < arr1.length; i++) {
    res[i] = arr2[i] - arr1[i];
  }
}

router.post('/', (req, res) => {
  res.send(calculateDelta(req.body.interpolated, req.body.func));
});

module.exports = router;