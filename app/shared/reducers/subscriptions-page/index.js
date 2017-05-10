/* global module, require */
const ACTIONS = require('./actions');

const initialState = {
  selectedChannel: null,
  activeTabIndex: 0,
  activeDetailsTab: 'Contents'
}

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.SET_SELECTED_CHANNEL:
      return Object.assign({}, state, {
        selectedChannel: action.payload
      });
    case ACTIONS.SET_ACTIVE_TAB_INDEX:
      return Object.assign({}, state, {
        activeTabIndex: action.payload
      });
    case ACTIONS.SET_ACTIVE_DETAILS_TAB:
      return Object.assign({}, state, {
        activeDetailsTab: action.payload
      });
    default:
      return state;
  }
}