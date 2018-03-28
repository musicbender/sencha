import express from 'express';
import runTest from './run-test';
import sites from './sites';
import summary from './summary';
import report from './report';

const router = express.Router();

router.use('/', runTest);
router.use('/', sites);
router.use('/', summary);
router.use('/', report);

export default router;
