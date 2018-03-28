import { RUNNER, RUNNER_SUCCESS, RUNNER_ERROR } from '../data/constants';
import { API } from '../data/config';

export function runTest(config) {
  const { site, env, archive } = config;
  
	const request = API.post(`run-test/${site}/${env}`, {
    data: {
      archive
    }
  });

  return {
    type: RUNNER,
    payload: request
  }
}

export function runTestSuccess(data) {
  return {
    type: RUNNER_SUCCESS,
    payload: data
  }
}

export function runTestFailure(error) {
  return {
    type: RUNNER_ERROR,
    payload: error
  }
}
