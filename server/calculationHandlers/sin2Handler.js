
'use strict'

const express = require('express');
const router = express.Router();

const sin2Interpolator = require(__base + 'interpolators/sin2');

router.post('/sin2', (req, res) => {
  res.send(sin2Interpolator.calculate([+req.body.startPoint, +req.body.endPoint], (+req.body.endPoint - +req.body.startPoint)/100));
});

module.exports = router;
