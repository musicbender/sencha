import { API } from '../data/config';
import {
  SUMMARY_FETCH,
  SUMMARY_FETCH_SUCCESS,
  SUMMARY_FETCH_ERROR,
  SUMMARY_FETCH_ALL,
  SUMMARY_FETCH_ALL_SUCCESS,
  SUMMARY_FETCH_ALL_ERROR
} from '../data/constants';

export function getSummaryAll(config) {
	const request = API.get(`/summary/all`);
  return {
    type: SUMMARY_FETCH_ALL,
    payload: request
  }
}

export function getSummaryAllSuccess(data) {
  return {
    type: SUMMARY_FETCH_ALL_SUCCESS,
    payload: data
  }
}

export function getSummaryAllFailure(error) {
  return {
    type: SUMMARY_FETCH_ALL_ERROR,
    payload: error
  }
}

export function getSummary(site) {
	const request = API.get(`/summary/site/${site}`);
  return {
    type: SUMMARY_FETCH,
    payload: request
  }
}

export function getSummarySuccess(data) {
  return {
    type: SUMMARY_FETCH_SUCCESS,
    payload: data
  }
}

export function getSummaryFailure(error) {
  return {
    type: SUMMARY_FETCH_ERROR,
    payload: error
  }
}
