import axios from 'axios';

let DATA_URL = 'https://s3-us-east-2.amazonaws.com/patjacobs-data/nctest/';

const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || '3001'}/api`) :
  '/api';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": 'application/json',
  },
});

const DATA = axios.create({
  baseURL: DATA_URL,
  headers: {
    "content-type": 'application/json',
  },
});

export {
  API,
  API_URL,
  DATA,
  DATA_URL
};
