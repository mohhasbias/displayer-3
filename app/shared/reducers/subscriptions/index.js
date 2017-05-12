/* global require, module */

const ACTIONS = require('./actions');
const fetchResultReducer = require('../fetch-result');
const fetchResultActions = require('../fetch-result/actions');

const initialState = fetchResultReducer(undefined, {type: '@@INIT'});

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.REQUEST_SUBSCRIPTIONS:
      return fetchResultReducer(state, fetchResultActions.fetchStart());
    case ACTIONS.RECEIVE_SUBSCRIPTIONS:
      return fetchResultReducer(state, fetchResultActions.fetchDone(action.payload));
    case ACTIONS.FAIL_SUBSCRIPTIONS:
      return fetchResultReducer(state, fetchResultActions.fetchFail(action.payload));
    default:
      return state;
  }
};
