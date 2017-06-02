/* global require, module */

const ACTIONS = require('./actions');
const fetchObjectReducer = require('../fetch-object');
const fetchObjectActions = require('../fetch-object/actions');

const initialState = fetchObjectReducer(undefined, {type: '@@INIT'});

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.REQUEST_SUBSCRIPTIONS:
      return fetchObjectReducer(state, fetchObjectActions.fetchStart());
    case ACTIONS.RECEIVE_SUBSCRIPTIONS:
      return fetchObjectReducer(state, fetchObjectActions.fetchDone(action.payload));
    case ACTIONS.FAIL_SUBSCRIPTIONS:
      return fetchObjectReducer(state, fetchObjectActions.fetchFail(action.payload));
    default:
      return state;
  }
};
