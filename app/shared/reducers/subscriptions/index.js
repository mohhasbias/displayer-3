/* global require, module */

const ACTIONS = require('./actions');
const fetchArrayReducer = require('../fetch-array');
const fetchArrayActions = require('../fetch-array/actions');

const initialState = fetchArrayReducer(undefined, {type: '@@INIT'});

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.REQUEST_SUBSCRIPTIONS:
      return fetchArrayReducer(state, fetchArrayActions.fetchStart());
    case ACTIONS.RECEIVE_SUBSCRIPTIONS:
      return fetchArrayReducer(state, fetchArrayActions.fetchDone(action.payload));
    case ACTIONS.FAIL_SUBSCRIPTIONS:
      return fetchArrayReducer(state, fetchArrayActions.fetchFail(action.payload));
    default:
      return state;
  }
};
