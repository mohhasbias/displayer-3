/* global require, module */

const ACTIONS = require('./actions');

const initialFetchResult = {
  isFetching: false,
  error: false,
  data: []
};

module.exports = function(state = initialFetchResult, action) {
  switch(action.type) {
    case ACTIONS.FETCH_START:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ACTIONS.FETCH_DONE:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload.data
      });
    case ACTIONS.FETCH_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        data: action.payload.data
      });
    default:
      return state;
  }
}
