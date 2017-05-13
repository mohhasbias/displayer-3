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
  return requestChannel(ORDER_NONE);
}

function receiveChannelList(data) {
  return receiveChannel(ORDER_NONE, data);
}

function failFetchChannelList(error) {
  return failFetchChannel(ORDER_NONE, error);
}

function requestChannelMostUploaded() {
  return requestChannel(ORDER_TOTAL);
}

function receiveChannelMostUploaded(data) {
  return receiveChannel(ORDER_TOTAL, data);
}


function failFetchChannelMostUploaded(error) {
  return failFetchChannel(ORDER_TOTAL, error);
}

function requestNewestChannels() {
  return requestChannel(ORDER_DATE_CREATED);
}

function receiveNewestChannels(data) {
  return receiveChannel(ORDER_DATE_CREATED, data);
}

function failFetchNewestChannels(error) {
  return failFetchChannel(ORDER_DATE_CREATED, error);
}

module.exports = {
  FETCH_CHANNELS,
  RECEIVE_CHANNELS,
  FAIL_FETCH_CHANNELS,

  ORDER_TOTAL,
  ORDER_DATE_CREATED,
  ORDER_NONE,

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
