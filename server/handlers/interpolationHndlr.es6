
'use strict'

const express = require('express');
const router = express.Router();

const Interpolator = require(__base + 'interpolators/newtonInterpolator');

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(Interpolator.interpolate(+req.body.startPoint, +req.body.endPoint, req.body.funcStr, +req.body.nodes));
});

module.exports = router;
