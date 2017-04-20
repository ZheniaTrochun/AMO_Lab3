
import express from 'express';
const router = express.Router();

import utils from 'utils.js';

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(utils.calculate([+req.body.startPoint, +req.body.endPoint], req.body.funcStr, 100));
});

export { router };
