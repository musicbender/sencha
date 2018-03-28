import { ENV_TOGGLE, ARCHIVE_TOGGLE } from '../data/constants';

export function toggleEnv(bool) {
  return {
    type: ENV_TOGGLE,
    payload: bool
  }
}

export function toggleArchive(bool) {
  return {
    type: ARCHIVE_TOGGLE,
    payload: bool
  }
}
