/* global module */

const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';

function selectSelectedChannel(state) {
  return state.subscriptionsPage.selectedChannel;
}

function setSelectedChannel(channelDetails) {
  return {
    type: SET_SELECTED_CHANNEL,
    payload: channelDetails
  };
}

const SET_ACTIVE_TAB_INDEX = 'SET_ACTIVE_TAB_INDEX';

function selectActiveTabIndex(state) {
  return state.subscriptionsPage.activeTabIndex;
}

function setActiveTabIndex(index) {
  return {
    type: SET_ACTIVE_TAB_INDEX,
    payload: index
  };
}

function selectActiveDetailsTab(state) {
  return state.subscriptionsPage.activeDetailsTab;
}

module.exports = {
  SET_SELECTED_CHANNEL,
  selectSelectedChannel,
  setSelectedChannel,

  SET_ACTIVE_TAB_INDEX,
  selectActiveTabIndex,
  setActiveTabIndex,

  selectActiveDetailsTab
};
