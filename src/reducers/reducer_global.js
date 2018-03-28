import { PAGE_LOADED, DRAWER_TOGGLE } from '../data/constants';
import initialState from '../data/initial-state';

export default function global(state = initialState.global, action) {
  switch (action.type) {
    case PAGE_LOADED:
      return { ...state, pageLoaded: true, };
    case DRAWER_TOGGLE:
      return { ...state, drawerOpen: action.payload };
    default:
      return state;
  }
}
