import { SITES_FETCH, SITES_FETCH_SUCCESS, SITES_FETCH_ERROR } from '../data/constants';
import initialState from '../data/initial-state';

export default function sites(state = initialState.sites, action) {
  const { type, payload } = action;
  switch (type) {
    case SITES_FETCH:
      return { ...state, loading: true };
    case SITES_FETCH_SUCCESS:
      return { ...state, data: payload, loading: false };
    case SITES_FETCH_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
