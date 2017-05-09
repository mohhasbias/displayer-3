/* global module */

const FETCH_START = 'FETCH_START';
const FETCH_DONE = 'FETCH_DONE';
const FETCH_FAIL = 'FETCH_FAIL';

function fetchStart() {
  return {
    type: FETCH_START
  };
}

function fetchDone(data) {
  return {
    type: FETCH_DONE,
    payload: data
  };
}

function fetchFail(error) {
  return {
    type: FETCH_FAIL,
    payload: error
  }
}

module.exports = {
  FETCH_START,
  FETCH_DONE,
  FETCH_FAIL,

  fetchStart,
  fetchDone,
  fetchFail
};
