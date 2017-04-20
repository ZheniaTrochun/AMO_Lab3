
import express from 'express';
const router = express.Router();

import Interpolator from 'newtonInterpolator.js';

router.post('/', (req, res) => {
  res.send(Interpolator.interpolate(+req.body.startPoint, +req.body.endPoint, req.body.funcStr, +req.body.nodes));
});

export { router };
