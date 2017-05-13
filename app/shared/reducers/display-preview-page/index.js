/* global require, module */
const objectAssign = require('object-assign');

const ACTIONS = require('./actions');

const initialState = {
  selectedChannel: null
};

module.exports = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
