import express from 'express';
import fs from 'fs';
import path from 'path';
import { apiResponse, parseResultsData, emptyDir, convertStats, timestamp } from '../util/util';
import { s3SendFile, s3GetLink } from '../controllers/api/run-test';
import Summary from '../models/summary';
import cappuccino from 'ncw-cappuccino';
import maConfig from '../static/mochawesome-config.json';

const router = express.Router();

router.post('/run-test/:site/:env', (req, res) => {
  const { site, env } = req.params;
  const { archive } = req.body.data;
  const config = require(`../../tests/${site}/config.js`).site || {};
  const params = {
    site,
    env,
    archive,
    createdAt: timestamp()
  }

  process.env.CAPPUCCINO_FUNCURL = config.funcURLS[env];

  // config for cappuccino to run test
  const cappConfig = {
    type: 'functional',
    pageTitle: config.title || `${site} functional test`,
    globPattern: `tests/${site}/*.test.js`,
    funcEnv: env,
    baseDir: 'server/temp',
    funcURLS: config.funcURLS || {},
    isLocal: false,
    globalFuncTests: config.globalFuncTests || null
  }

  cappuccino(cappConfig, invalidate => {
    const saveDest = `/${site}/${env}-${params.createdAt}.json`;
    invalidate();
    sendData({
      params,
      res,
      testConfig: config,
      saveDest
    });
  });
});

function saveReport (params, saveDest) {
  const { site, env } = params;
  s3SendFile('server/temp/runner.json', saveDest);
}

function saveSummary (data, params, saveDest) {
  const { passPercentClass, pendingPercentClass, start, end, ...output } = data.stats;
  const { site, env, createdAt } = params;

  output.site =  site;
  output.env = env;
  output.reportURL = s3GetLink(saveDest);
  output.createdAt = createdAt;

  const summary = new Summary(output);

  summary.save((err, results) => {
    if (err) console.error(err);
    console.log(results);
  });
}

function sendData (configs) {
  const { params, res, testConfig, saveDest } = configs;
  const { site, env } = params;

  fs.readFile('server/temp/runner.json', 'utf8', (err, data) => {
    data = JSON.parse(data);

    const configData = {
      "reportTitle": testConfig.title,
      "reportPageTitle": testConfig.title,
      ...maConfig
    }

    const output = {
      data: JSON.stringify(data),
      config: JSON.stringify(configData)
    }

    if (params.archive) {
      saveReport(params, saveDest);
      saveSummary(data, params, saveDest);
    }

    apiResponse(res, 200, 0, 'success', output);
  });
}

export default router;
