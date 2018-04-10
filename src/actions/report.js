import {
  REPORT_FETCH,
  REPORT_FETCH_SUCCESS,
  REPORT_FETCH_ERROR,
  REPORT_URL_FETCH,
  REPORT_URL_FETCH_SUCCESS,
  REPORT_LOADING,
  REPORT_RESET
} from '../data/constants';
import { API, DATA } from '../data/config';

export function fetchReportURL(config) {
  const { site, date, env } = config;
	const request = API.get(`report-url/${site}/${date}/${env}`);
  return {
    type: REPORT_URL_FETCH,
    payload: request
  }
}

export function fetchReportURLSuccess(data) {
  return {
    type: REPORT_URL_FETCH_SUCCESS,
    payload: data
  }
}

export function fetchReport(url) {
	const request = DATA.get(url);
  return {
    type: REPORT_FETCH,
    payload: request
  }
}

export function fetchReportSuccess(data) {
  return {
    type: REPORT_FETCH_SUCCESS,
    payload: data
  }
}

export function fetchReportFailure(error) {
  return {
    type: REPORT_FETCH_ERROR,
    payload: error
  }
}

export function loadingReport(loading = true) {
  return {
    type: REPORT_LOADING,
    payload: loading
  }
}

export function resetReport() {
  return  {
    type: REPORT_RESET
  }
}
