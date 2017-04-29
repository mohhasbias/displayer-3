/* global require, module */

const FETCH_CHANNELS = 'FETCH_CHANNELS';
const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
const FAIL_FETCH_CHANNELS = 'FAIL_FETCH_CHANNELS';

function selectChannelList(rootState) {
  return rootState.channels.list;
}

function selectMostUploadedContent(rootState) {
  return rootState.channels.mostUploadedContent || require('../../../../data/most-uploaded-channels.json');
}

function selectNewestChannels(rootState) {
  return require('../../../../data/newest-channels.json');
}

function fetchChannels(dispatch) {
  return {
    type: FETCH_CHANNELS,
    payload: dispatch
  };
}

function receiveChannels(data) {
  return {
    type: RECEIVE_CHANNELS,
    payload: data
  };
}

module.exports = {
  FETCH_CHANNELS,
  RECEIVE_CHANNELS,
  FAIL_FETCH_CHANNELS,
  selectChannelList,
  selectMostUploadedContent,
  selectNewestChannels,
  fetchChannels,
  receiveChannels
};
