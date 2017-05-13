/* global module */

const FETCH_ARRAY_START = 'FETCH_ARRAY_START';
const FETCH_ARRAY_DONE = 'FETCH_DONE';
const FETCH_ARRAY_FAIL = 'FETCH_FAIL';

function fetchStart() {
  return {
    type: FETCH_ARRAY_START
  };
}

function fetchDone(data) {
  return {
    type: FETCH_ARRAY_DONE,
    payload: data
  };
}

function fetchFail(error) {
  return {
    type: FETCH_ARRAY_FAIL,
    payload: error
  }
}

module.exports = {
  FETCH_ARRAY_START,
  FETCH_ARRAY_DONE,
  FETCH_ARRAY_FAIL,

  fetchStart,
  fetchDone,
  fetchFail
};
