/* global require, module */

const ACTIONS = require('./actions');
const channelAPI = require('../../api/channels');

function fetchChannelList(dispatch) {
  // side effects
  channelAPI.fetchChannels(
    channelAPI.ORDER_NONE,
    (json) => dispatch(ACTIONS.receiveChannelList(json)),
    (err) => dispatch(ACTIONS.failFetchChannelList(err))
  );

  return ACTIONS.requestChannelList();
}

function fetchChannelMostUploaded(dispatch) {
  // side effects
  channelAPI.fetchChannels(
    channelAPI.ORDER_BY_TOTAL,
    (json) => dispatch(ACTIONS.receiveChannelMostUploaded(json)),
    (err) => dispatch(ACTIONS.failFetchChannelMostUploaded(err))
  );

  return ACTIONS.requestChannelMostUploaded();
}

function fetchNewestChannels(dispatch) {
  // side effects
  channelAPI.fetchChannels(
    channelAPI.ORDER_BY_DATE_CREATED,
    (json) => dispatch(ACTIONS.receiveNewestChannels(json)),
    (err) => dispatch(ACTIONS.failFetchNewestChannels(err))
  );

  return ACTIONS.requestNewestChannels();
}

module.exports = {
  fetchChannelList,
  fetchNewestChannels,
  fetchChannelMostUploaded
};
