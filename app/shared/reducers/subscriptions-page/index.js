/* global module, require */
const objectAssign = require('object-assign');

const ACTIONS = require('./actions');
const fetchObjectReducer = require('../../reducers/fetch-object');
const fetchObjectActions = require('../../reducers/fetch-object/actions');

const initialState = {
  selectedChannel: fetchObjectReducer(undefined, { type: '@@INIT' }),
  activeTabIndex: 0,
  activeDetailsTab: 'Contents'
}

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case ACTIONS.SET_SELECTED_CHANNEL:
      return objectAssign({}, state, {
        selectedChannel: action.payload
      });
    case ACTIONS.SET_ACTIVE_TAB_INDEX:
      return objectAssign({}, state, {
        activeTabIndex: action.payload
      });
    case ACTIONS.SET_ACTIVE_DETAILS_TAB:
      return objectAssign({}, state, {
        activeDetailsTab: action.payload
      });
    case ACTIONS.FETCH_SELECTED_CHANNEL:
      return objectAssign({}, state, {
        selectedChannel: fetchObjectReducer(
          state.selectedChannel, 
          fetchObjectActions.fetchStart()
        )
      });
    case ACTIONS.RECEIVE_SELECTED_CHANNEL:
      return objectAssign({}, state, {
        selectedChannel: fetchObjectReducer(
          state.selectedChannel,
          fetchObjectActions.fetchDone(action.payload)
        )
      });
    case ACTIONS.FAIL_FETCH_SELECTED_CHANNEL:
      return objectAssign({}, state, {
        selectedChannel: fetchObjectReducer(
          state.selectedChannel,
          fetchObjectActions.fetchFail(action.payload)
        )
      });
    default:
      return state;
  }
}