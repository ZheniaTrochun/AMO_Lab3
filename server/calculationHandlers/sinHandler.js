
'use strict'

const express = require('express');
const router = express.Router();

const sinInterpolator = require(__base + 'interpolators/sin');

router.post('/sin', (req, res) => {
  res.send(sinInterpolator.calculate([+req.body.startPoint, +req.body.endPoint], 0.01));
});

module.exports = router;
