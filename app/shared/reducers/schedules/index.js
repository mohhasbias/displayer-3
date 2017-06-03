/* global require, module */
const { handleActions } = require('redux-actions');
const _ = require('lodash');

const actions = require('./actions');

const initialState = {
  'eWRhpRV': true
};

const reducer = handleActions({
  [actions.SCHEDULE_ADD_CHANNEL]: (state, action) => {
    return _.assign({}, state, {
      [action.payload]: true
    });
  },

  [actions.SCHEDULE_REMOVE_CHANNEL]: (state, action) => {
    return _.assign({}, state, {
      [action.payload]: false
    });
  } 
}, initialState);

module.exports = reducer;
