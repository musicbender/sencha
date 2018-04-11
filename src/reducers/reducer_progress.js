import { TEST_IN_PROGRESS, TEST_NOT_IN_PROGRESS, SOCKET_FAIL } from '../data/constants';
import initialState from '../data/initial-state';

export default function progress(state = initialState.progress, action) {
  const { type, payload } = action;
  switch (type) {
    case TEST_IN_PROGRESS:
      return { ...state, inProgress: true, error: null };
    case TEST_NOT_IN_PROGRESS:
      return { ...state, inProgress: false, error: null };
    case SOCKET_FAIL:
      return { ...state, inProgress: false, error: true}
    default:
      return state;
  }
}
