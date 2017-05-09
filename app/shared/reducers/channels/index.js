/* global require, module */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const ACTIONS = require('./actions');
const fetchResultReducer = require('../fetch-result');
const fetchResultActions = require('../fetch-result/actions');

// const initialChannelState = {
//   isFetching: false,
//   items: []
// };

// function channels(state = initialChannelState, action) {
//   switch(action.type) {
//     case ACTIONS.FETCH_CHANNELS:
//       return Object.assign({}, state, {
//         isFetching: true
//       });
//     case ACTIONS.RECEIVE_CHANNELS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         items: action.payload.data
//       });
//     default:
//       return state;
//   }
// }

const initialState = {
  [ACTIONS.ORDER_NONE]: fetchResultReducer(undefined, {type: '@@INIT'}),
  [ACTIONS.ORDER_TOTAL]: fetchResultReducer(undefined, {type: '@@INIT'}),
  [ACTIONS.ORDER_DATE_CREATED]: fetchResultReducer(undefined, {type: '@@INIT'})
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.FETCH_CHANNELS:
      return Object.assign({}, state, {
        [action.payload.order]: fetchResultReducer(state[action.payload.order], fetchResultActions.fetchStart())
      });
    case ACTIONS.RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        [action.payload.order]: fetchResultReducer(state[action.payload.order], fetchResultActions.fetchDone(action.payload))
      });
    default:
      return state;
  }
};
