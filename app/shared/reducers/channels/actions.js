/* global require, module */
const constants = require('./constants');

const FETCH_CHANNELS = 'FETCH_CHANNELS';
const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
const FAIL_FETCH_CHANNELS = 'FAIL_FETCH_CHANNELS';

function selectChannelList(rootState) {
  return rootState.channels[constants.ORDER_NONE];
}

function selectChannelMostUploaded(rootState) {
  return rootState.channels[constants.ORDER_TOTAL];
}

function selectNewestChannels(rootState) {
  return rootState.channels[constants.ORDER_DATE_CREATED];
}

function requestChannel(order) {
  return {
    type: FETCH_CHANNELS,
    payload: {
      order
    }
  };
}

function receiveChannel(order, data) {
  return {
    type: RECEIVE_CHANNELS,
    payload: {
      order,
      data
    }
  };
}

function failFetchChannel(order, error) {
  return {
    type: FAIL_FETCH_CHANNELS,
    payload: {
      order,
      error
    }
  };
}

function requestChannelList() {
  return requestChannel(constants.ORDER_NONE);
}

function receiveChannelList(data) {
  return receiveChannel(constants.ORDER_NONE, data);
}

function failFetchChannelList(error) {
  return failFetchChannel(constants.ORDER_NONE, error);
}

function requestChannelMostUploaded() {
  return requestChannel(constants.ORDER_TOTAL);
}

function receiveChannelMostUploaded(data) {
  return receiveChannel(constants.ORDER_TOTAL, data);
}

function failFetchChannelMostUploaded(error) {
  return failFetchChannel(constants.ORDER_TOTAL, error);
}

function requestNewestChannels() {
  return requestChannel(constants.ORDER_DATE_CREATED);
}

function receiveNewestChannels(data) {
  return receiveChannel(constants.ORDER_DATE_CREATED, data);
}

function failFetchNewestChannels(error) {
  return failFetchChannel(constants.ORDER_DATE_CREATED, error);
}

module.exports = {
  FETCH_CHANNELS,
  RECEIVE_CHANNELS,
  FAIL_FETCH_CHANNELS,

  requestChannelList,
  receiveChannelList,
  failFetchChannelList,
  selectChannelList,

  requestChannelMostUploaded,
  receiveChannelMostUploaded,
  failFetchChannelMostUploaded,
  selectChannelMostUploaded,

  requestNewestChannels,
  receiveNewestChannels,
  failFetchNewestChannels,
  selectNewestChannels
};
