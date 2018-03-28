import Promise from 'bluebird';
import moment from 'moment';
import rimraf from 'rimraf';
const fs = Promise.promisifyAll(require('fs'));

export const apiResponse = (res, httpCode = 500, code = 3, message='success', data={}) => {
  let responseData = {};
  responseData.code = code;
  responseData.message = message;
  responseData.data = data;
  res.status(httpCode).json(responseData)
}

export const parseResultsData = data => {
  const raw = data.match(/data-raw="(.*?})"/);
  const config = data.match(/data-config="(.*})"/);

  return {
    raw: raw[1].replace(/&quot;/g, '\"'),
    config: config[1].replace(/&quot;/g, '\"')
  };
}

export const getContentTypeByFile = fileName => {
  const fn = fileName.toLowerCase();
  switch(true) {
    case fn.indexOf('.html') >= 0:
      return 'text/html';
    case fn.indexOf('.css') >= 0:
      return 'text/css';
    case fn.indexOf('.json') >= 0:
      return 'application/json';
    case fn.indexOf('.js') >= 0:
      return 'application/x-javascript';
    case fn.indexOf('.png') >= 0:
      return 'image/png';
    case fn.indexOf('.jpg') >= 0:
      return 'image/jpg';
    default:
      return 'application/octet-stream';
  }
}

export const emptyDir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdirAsync(dir)
      .then(files => {
        console.log(files);
        const path = `${dir}/${files[1]}`;
        fs.unlinkAsync(path)
          .then(() => {
            console.log('file removed');
            resolve();
          });
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  })
}

export const timestamp = () => {
  return moment().toISOString();
}
