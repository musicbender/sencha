import initialState from '../data/initial-state';
import {
  REPORT_FETCH,
  REPORT_FETCH_SUCCESS,
  REPORT_FETCH_ERROR,
  REPORT_URL_FETCH,
  REPORT_URL_FETCH_SUCCESS,
  REPORT_URL_FETCH_ERROR,
  REPORT_LOADING,
  REPORT_RESET,
  RUNNER,
  RUNNER_SUCCESS,
  RUNNER_ERROR
} from '../data/constants';

export default function report(state = initialState.report, action) {
  const { type, payload } = action;
  switch (type) {
    case REPORT_URL_FETCH:
    case RUNNER:
      return { ...state, data: null, loading: true };
    case REPORT_FETCH:
      return { ...state };
    case REPORT_FETCH_SUCCESS:
      return { ...state, data: payload, loading: false };
    case RUNNER_SUCCESS:
      return { ...state, data: payload.data, config: payload.config, loading: false };
    case REPORT_URL_FETCH_SUCCESS:
      return { ...state, config: payload };
    case REPORT_FETCH_ERROR:
    case RUNNER_ERROR:
      return { ...state, data: null, error: payload, loading: false };
    case REPORT_LOADING:
      return { ...state, loading: payload };
    case REPORT_RESET:
      return { ...state, data: null, config: null, error: null };
    default:
      return state;
  }
}
