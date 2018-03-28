import express from 'express';
import path from 'path';
import fs from 'fs';
import { getReportURL, getReportConfig } from '../controllers/api/report';
import { apiResponse } from '../util/util';

const router = express.Router();

router.get('/report-url/:site/:date', (req, res) => {
  const { site, date } = req.params;
  getReportURL({site, date})
    .then(result => {
      const output = {
        url: result,
        config: getReportConfig(site)
      };

      apiResponse(res, 200, 0, 'success', output);
    })
    .catch(err => {
      console.err(err);
      apiResponse(res, 500, 0, 'error', err);
    });
});

export default router;
