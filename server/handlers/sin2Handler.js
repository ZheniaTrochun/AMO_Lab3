
'use strict'

const express = require('express');
const router = express.Router();

const sin2Interpolator = require(__base + 'interpolators/sin2');

router.use((req, res, next) => {
  console.log('Sin2 time: ', Date.now());
  next();
});

router.post('/sin2', (req, res) => {
  console.log(req.body);
  console.log(req.body.startPoint);
    console.log(req.body.endPoint);
  res.send(sin2Interpolator.interpolate([+req.body.startPoint, +req.body.endPoint]));
});

module.exports = router;