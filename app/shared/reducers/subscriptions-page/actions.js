/* global require, module */

const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';

function selectSelectedChannel(state) {
  return state.subscriptionsPage.selectedChannel;
}

function setSelectedChannel(channelId) {
  console.log(channelId);
  var channelDetails = {};
  switch(channelId) {
    case 'eWRhpRV':
      channelDetails = require('../../../../data/channel-details-eWRhpRV.json');
      break;
    case '23TplPdS':
      channelDetails = require('../../../../data/channel-details-23TplPdS.json');
      break;
    case '46Juzcyx':
      channelDetails = require('../../../../data/channel-details-46Juzcyx.json');
      break;
    default:
      channelDetails = require('../../../../data/channel-details-eWRhpRV.json');
  }

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

const SET_ACTIVE_DETAILS_TAB = 'SET_ACTIVE_DETAILS_TAB';

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
  SET_SELECTED_CHANNEL,
  selectSelectedChannel,
  setSelectedChannel,

  SET_ACTIVE_TAB_INDEX,
  selectActiveTabIndex,
  setActiveTabIndex,

  SET_ACTIVE_DETAILS_TAB,
  selectActiveDetailsTab,
  setActiveDetailsTab
};
