/* global module */

const FETCH_OBJECT_START = 'FETCH_OBJECT_START';
const FETCH_OBJECT_DONE = 'FETCH_OBJECT_DONE';
const FETCH_OBJECT_FAIL = 'FETCH_OBJECT_FAIL';

function fetchStart() {
  return {
    type: FETCH_OBJECT_START
  };
}

function fetchDone(data) {
  return {
    type: FETCH_OBJECT_DONE,
    payload: data
  };
}

function fetchFail(error) {
  return {
    type: FETCH_OBJECT_FAIL,
    payload: error
  }
}

module.exports = {
  FETCH_OBJECT_START,
  FETCH_OBJECT_DONE,
  FETCH_OBJECT_FAIL,

  fetchStart,
  fetchDone,
  fetchFail
};
