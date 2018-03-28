import fs from 'fs';
import { AWS, S3_URL, S3_BUCKET, S3_BASEPATH, S3_CUSTOMER_ALG, S3_CUSTOMER_KEY } from '../../config';
import { getContentTypeByFile } from '../../util/util';
import maConfig from '../../static/mochawesome-config.json';

const s3 = new AWS.S3();

export const getReportConfig = site => {
  const title = require(`../../../tests/${site}/config.js`).site.title || {};
  return {
    "reportTitle": title,
    "reportPageTitle": title,
    ...maConfig
  }
}

export const getReportURL = data => {
  return new Promise((resolve, reject) => {
    const { site, date } = data;
    const key = `${S3_BASEPATH}/${site}/live-${date}.json`;

    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Expires: 900,
      SSECustomerAlgorithm: S3_CUSTOMER_ALG,
      SSECustomerKey: S3_CUSTOMER_KEY
    }

    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) reject(err);
      resolve(url);
    })
  });
}
