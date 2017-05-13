/* global require, module */

const channelAPI = require('../../api/channels');
const ACTIONS = require('./actions');

function fetchSelectedChannel(channelId) {
  return (dispatch) => {
    dispatch(ACTIONS.requestSelectedChannel());

    channelAPI.fetchChannelDetails(channelId)
      .then(json => dispatch(ACTIONS.receiveSelectedChannel(json)))
      .catch(error => {
        dispatch(ACTIONS.failFetchSelectedChannel(error))
      })    
  };
}

module.exports = {
  fetchSelectedChannel
};
