
'use strict'

const express = require('express');
const router = express.Router();

const sinInterpolator = require(__base + 'interpolators/sin');

router.use((req, res, next) => {
  console.log('Sin time: ', Date.now());
  next();
});

router.post('/sin', (req, res) => {
  res.send(sinInterpolator.interpolate([+req.body.startPoint, +req.body.endPoint]));
});

module.exports = router;
