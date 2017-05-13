/* global module */

const SET_ACTIVE_TAB_INDEX = 'SET_ACTIVE_TAB_INDEX';

const SET_ACTIVE_DETAILS_TAB = 'SET_ACTIVE_DETAILS_TAB';

const FETCH_SELECTED_CHANNEL = 'FETCH_SELECTED_CHANNEL';
const RECEIVE_SELECTED_CHANNEL = 'RECEIVE_SELECTED_CHANNEL';
const FAIL_FETCH_SELECTED_CHANNEL = 'FAIL_FETCH_SELECTED_CHANNEL';

function setSelectedChannel(channelDetails) {
  return receiveSelectedChannel(channelDetails);
}

function requestSelectedChannel() {
  return {
    type: FETCH_SELECTED_CHANNEL
  };
}

function receiveSelectedChannel(data) {
  return {
    type: RECEIVE_SELECTED_CHANNEL,
    payload: data
  };
}

function failFetchSelectedChannel(error) {
  return {
    type: FAIL_FETCH_SELECTED_CHANNEL,
    payload: error.message
  };
}

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

function setActiveDetailsTab(tabName) {
  return {
    type: SET_ACTIVE_DETAILS_TAB,
    payload: tabName
  }
}

module.exports = {
  SET_ACTIVE_TAB_INDEX,
  selectActiveTabIndex,
  setActiveTabIndex,

  SET_ACTIVE_DETAILS_TAB,
  selectActiveDetailsTab,
  setActiveDetailsTab,

  FETCH_SELECTED_CHANNEL,
  RECEIVE_SELECTED_CHANNEL,
  FAIL_FETCH_SELECTED_CHANNEL,

  requestSelectedChannel,
  receiveSelectedChannel,
  failFetchSelectedChannel,
  setSelectedChannel
};
