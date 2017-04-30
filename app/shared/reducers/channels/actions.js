/* global require, module */
require('es6-promise').polyfill();
require('isomorphic-fetch');

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
  // side effects
  fetchChannels(ORDER_NONE, dispatch, receiveChannelList);

  return {
    type: FETCH_CHANNELS,
    payload: {
      order: ORDER_NONE
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
  // side effects
  fetchChannels(ORDER_TOTAL, dispatch, receiveChannelMostUploaded);

  return {
    type: FETCH_CHANNELS,
    payload: {
      order: ORDER_TOTAL
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
  // side effects
  fetchChannels(ORDER_DATE_CREATED, dispatch, receiveNewestChannels);

  return {
    type: FETCH_CHANNELS,
    payload: {
      order: ORDER_DATE_CREATED
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

////////////////////////////////////////
function fetchChannels(order, dispatch, receiveAction) {
  const fetchURL = {
    [ORDER_NONE]: '/data/channels.json',
    [ORDER_TOTAL]: '/data/most-uploaded-channels.json',
    [ORDER_DATE_CREATED]: '/data/newest-channels.json'
  };

  fetch(fetchURL[order])
    .then(res => res.json())
    .then(json => dispatch(receiveAction(json)));
}
