
'use strict'

const express = require('express');
const router = express.Router();

const utils = require(__base + 'utils/utils');

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(utils.calculate([+req.body.startPoint, +req.body.endPoint], req.body.funcStr, 100));
});

module.exports = router;
