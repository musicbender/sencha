import express from 'express';
import Summary from '../models/summary';
import { getRecentAll, getFull } from '../controllers/api/summary';
import { apiResponse } from '../util/util';

const router = express.Router();

router.get('/summary/all', (req, res) => {
  getRecentAll()
    .then(data => {
      apiResponse(res, 200, 0, 'success', data);
    })
    .catch(err => {
      apiResponse(res, 500, 0, 'error', err);
    });
});

router.get('/summary/site/:site', (req, res) => {
  const { site } = req.params;
  getFull(site)
    .then(data => {
      apiResponse(res, 200, 0, 'success', data);
    })
    .catch(err => {
      apiResponse(res, 500, 0, 'error', err);
    });
});

export default router;
