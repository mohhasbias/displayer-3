/* global module, require */
const ACTIONS = require('./actions');

const initialState = 3000;

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.SET_CAROUSEL_INTERVAL:
      return action.payload;
    default:
      return state;
  }
};