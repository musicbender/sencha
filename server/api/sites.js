import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiResponse } from '../util/util';

const router = express.Router();

router.get('/get-sites', (req, res) => {
  const testsDir = path.resolve(__dirname, '../../tests');
  fs.readdir(testsDir, (err, files) => {
    if (err) console.log(err);
    apiResponse(res, 200, 0, 'success', files);
  });
});

export default router;
