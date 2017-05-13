/* global require, module */
const objectAssign = require('object-assign');

const ACTIONS = require('./actions');

const initialFetchResult = {
  isFetching: false,
  error: false,
  data: null
};

module.exports = function(state = initialFetchResult, action) {
  switch(action.type) {
    case ACTIONS.FETCH_OBJECT_START:
      return objectAssign({}, state, {
        isFetching: true
      });
    case ACTIONS.FETCH_OBJECT_DONE:
      return objectAssign({}, state, {
        isFetching: false,
        error: false,
        data: action.payload
      });
    case ACTIONS.FETCH_OBJECT_FAIL:
      return objectAssign({}, state, {
        isFetching: false,
        error: true,
        data: action.payload
      });
    default:
      return state;
  }
}
