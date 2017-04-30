/* global module */

const FETCH_CHANNELS = 'FETCH_CHANNELS';
const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
const FAIL_FETCH_CHANNELS = 'FAIL_FETCH_CHANNELS';

const ORDER_TOTAL = 'mostUploaded';
const ORDER_DATE_CREATED = 'newest';
const ORDER_NONE = 'list';

function selectChannelList(rootState) {
  return rootState.channels[ORDER_NONE];
}

function selectChannelMostUploaded(rootState) {
  return rootState.channels[ORDER_TOTAL];
}

function selectNewestChannels(rootState) {
  return rootState.channels[ORDER_DATE_CREATED];
}

function fetchChannelList(dispatch) {
  return {
    type: FETCH_CHANNELS,
    payload: {
      order: ORDER_NONE,
      dispatch
    }
  };
}

function receiveChannelList(data) {
  return {
    type: RECEIVE_CHANNELS,
    payload: {
      order: ORDER_NONE,
      data
    }
  };
}

function fetchChannelMostUploaded(dispatch) {
  return {
    type: FETCH_CHANNELS,
    payload: {
      order: ORDER_TOTAL,
      dispatch
    }
  };
}

function receiveChannelMostUploaded(data) {
  return {
    type: RECEIVE_CHANNELS,
    payload: {
      order: ORDER_TOTAL,
      data
    }
  };
}

function fetchNewestChannels(dispatch) {
  return {
    type: FETCH_CHANNELS,
    payload: {
      order: ORDER_DATE_CREATED,
      dispatch
    }
  };
}

function receiveNewestChannels(data) {
  return {
    type: RECEIVE_CHANNELS,
    payload: {
      order: ORDER_DATE_CREATED,
      data
    }
  };
}

module.exports = {
  FETCH_CHANNELS,
  RECEIVE_CHANNELS,
  FAIL_FETCH_CHANNELS,

  ORDER_TOTAL,
  ORDER_DATE_CREATED,
  ORDER_NONE,

  fetchChannelList,
  receiveChannelList,
  selectChannelList,

  fetchChannelMostUploaded,
  receiveChannelMostUploaded,
  selectChannelMostUploaded,

  fetchNewestChannels,
  receiveNewestChannels,
  selectNewestChannels
};
