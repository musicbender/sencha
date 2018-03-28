import { ENV_TOGGLE, ARCHIVE_TOGGLE } from '../data/constants';
import initialState from '../data/initial-state';

export default function setting(state = initialState.settings, action) {
  switch(action.type) {
    case ENV_TOGGLE:
      return { ...state, live: action.payload };
    case ARCHIVE_TOGGLE:
      return { ...state, archive: action.payload };
    default:
      return state;
  }
}
