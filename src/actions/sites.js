import { SITES_FETCH, SITES_FETCH_SUCCESS, SITES_FETCH_ERROR } from '../data/constants';
import { API } from '../data/config';

export function fetchSites() {
	const request = API.get('get-sites');
  return {
    type: SITES_FETCH,
    payload: request
  }
}

export function fetchSitesSuccess(data) {
  return {
    type: SITES_FETCH_SUCCESS,
    payload: data
  }
}

export function fetchSitesFailure(error) {
  return {
    type: SITES_FETCH_ERROR,
    payload: error
  }
}
