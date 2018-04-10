import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiResponse } from '../util/util';
import { TESTS_DIR } from '../config';

const router = express.Router();
console.log(`tess dir`);
console.log(TESTS_DIR);
router.get('/get-sites', (req, res) => {
  const testsDir = path.resolve(__dirname, TESTS_DIR);
  fs.readdir(testsDir, (err, files) => {
    if (err) console.log(err);
    apiResponse(res, 200, 0, 'success', files);
  });
});

export default router;
