import initialState from '../data/initial-state';
import {
  SUMMARY_FETCH,
  SUMMARY_FETCH_SUCCESS,
  SUMMARY_FETCH_ERROR,
  SUMMARY_FETCH_ALL,
  SUMMARY_FETCH_ALL_SUCCESS,
  SUMMARY_FETCH_ALL_ERROR
} from '../data/constants';

export default function summary(state = initialState.summary, action) {
  const { type, payload } = action;
  switch (type) {
    case SUMMARY_FETCH:
      return { ...state, loading: true };
    case SUMMARY_FETCH_SUCCESS:
      return { ...state, site: payload, loading: false };
    case SUMMARY_FETCH_ERROR:
      return { ...state, error: payload, loading: false };
    case SUMMARY_FETCH_ALL:
      return { ...state, loading: true };
    case SUMMARY_FETCH_ALL_SUCCESS:
      return { ...state, all: payload, loading: false };
    case SUMMARY_FETCH_ALL_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
