/* global require, module */

const ACTIONS = require('./actions');

function fetchChannelList(dispatch) {
  // side effects
  fetchChannels(
    ACTIONS.ORDER_NONE, 
    dispatch, 
    ACTIONS.receiveChannelList,
    ACTIONS.failFetchChannelList
  );

  return ACTIONS.requestChannelList();
}

function fetchChannelMostUploaded(dispatch) {
  // side effects
  fetchChannels(
    ACTIONS.ORDER_TOTAL, 
    dispatch, 
    ACTIONS.receiveChannelMostUploaded,
    ACTIONS.failFetchChannelMostUploaded
  );

  return ACTIONS.requestChannelMostUploaded();
}

function fetchNewestChannels(dispatch) {
  // side effects
  fetchChannels(
    ACTIONS.ORDER_DATE_CREATED, 
    dispatch, 
    ACTIONS.receiveNewestChannels,
    ACTIONS.failFetchNewestChannels);

  return ACTIONS.requestNewestChannels();
}

module.exports = {
  fetchChannelList,
  fetchNewestChannels,
  fetchChannelMostUploaded
};

////////////////////////////////////////
function fetchChannels(order, dispatch, receiveAction, failAction) {
  const fetchURL = {
    [ACTIONS.ORDER_NONE]: '/data/channels.json',
    [ACTIONS.ORDER_TOTAL]: '/data/most-uploaded-channels.json',
    [ACTIONS.ORDER_DATE_CREATED]: '/data/newest-channels.json'
  };

  fetch(fetchURL[order])
    .then(res => res.json())
    .then(json => dispatch(receiveAction(json)))
    .catch(err => dispatch(failAction(err)));
}
