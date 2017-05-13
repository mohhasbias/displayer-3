/* global require, module */

const ACTIONS = require('./actions');
const channelAPI = require('../../api/channels');

function fetchChannelList() {
  // side effects
  return (dispatch) => {
    dispatch(ACTIONS.requestChannelList());

    channelAPI.fetchChannels(
      channelAPI.ORDER_NONE,
      (json) => dispatch(ACTIONS.receiveChannelList(json)),
      (err) => dispatch(ACTIONS.failFetchChannelList(err))
    );
  };
}

function fetchChannelMostUploaded() {
  // side effects
  return (dispatch) => {
    dispatch(ACTIONS.requestChannelMostUploaded());

    channelAPI.fetchChannels(
      channelAPI.ORDER_BY_TOTAL,
      (json) => dispatch(ACTIONS.receiveChannelMostUploaded(json)),
      (err) => dispatch(ACTIONS.failFetchChannelMostUploaded(err))
    );
  };
}

function fetchNewestChannels() {
  // side effects
  return (dispatch) => {
    dispatch(ACTIONS.requestNewestChannels());

    channelAPI.fetchChannels(
      channelAPI.ORDER_BY_DATE_CREATED,
      (json) => dispatch(ACTIONS.receiveNewestChannels(json)),
      (err) => dispatch(ACTIONS.failFetchNewestChannels(err))
    );
  };
}

module.exports = {
  fetchChannelList,
  fetchNewestChannels,
  fetchChannelMostUploaded
};
