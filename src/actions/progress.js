import { TEST_IN_PROGRESS, TEST_NOT_IN_PROGRESS, SOCKET_FAIL } from '../data/constants';

export function setInProgress(bool) {
  return {
    type: bool ? TEST_IN_PROGRESS : TEST_NOT_IN_PROGRESS
  }
}

export function socketFail() {
  return {
    type: SOCKET_FAIL
  }
}

export function inProgressSocket(bool, socket) {
  return {
    type: bool ? TEST_IN_PROGRESS : TEST_NOT_IN_PROGRESS,
    payload: bool ? socket.emit('inProgress') : socket.emit('notInProgress')
  }
}
