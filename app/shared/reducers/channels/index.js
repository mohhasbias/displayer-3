/* global require, module */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const ACTIONS = require('./actions');
const constants = require('./constants');
const fetchArrayReducer = require('../fetch-array');
const fetchArrayActions = require('../fetch-array/actions');

const initialState = {
  [constants.ORDER_NONE]: fetchArrayReducer(undefined, {type: '@@INIT'}),
  [constants.ORDER_TOTAL]: fetchArrayReducer(undefined, {type: '@@INIT'}),
  [constants.ORDER_DATE_CREATED]: fetchArrayReducer(undefined, {type: '@@INIT'})
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.FETCH_CHANNELS:
      return Object.assign({}, state, {
        [action.payload.order]: fetchArrayReducer(state[action.payload.order], fetchArrayActions.fetchStart())
      });
    case ACTIONS.RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        [action.payload.order]: fetchArrayReducer(state[action.payload.order], fetchArrayActions.fetchDone(action.payload))
      });
    default:
      return state;
  }
};
