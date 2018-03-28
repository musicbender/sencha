import { RUNNER, RUNNER_SUCCESS, RUNNER_ERROR } from '../data/constants';
import initialState from '../data/initial-state';

export default function runner(state = initialState.runner, action) {
  const { type, payload } = action;
  switch (type) {
    case RUNNER:
      return { ...state, loading: true };
    case RUNNER_SUCCESS:
      return { ...state, loading: false };
    case RUNNER_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
