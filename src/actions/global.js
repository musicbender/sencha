import { PAGE_LOADED, DRAWER_TOGGLE } from '../data/constants';

export function toggleDrawer(bool) {
  return {
    type: DRAWER_TOGGLE,
    payload: bool
  }
}
