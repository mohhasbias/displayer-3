/* global require, module */
const { createSelector } = require('reselect');
const objectAssign = require('object-assign');

const channelConstants = require('./reducers/channels/constants');

const selectSubscriptions = state => state.subscriptions;

const selectChannelMostUploaded = state => state.channels[channelConstants.ORDER_TOTAL];
const selectNewestChannels = state => state.channels[channelConstants.ORDER_DATE_CREATED];
const selectChannelList = state => state.channels[channelConstants.ORDER_NONE];

const selectSelectedChannel = state => state.subscriptionsPage.selectedChannel;
const selectActiveTabIndex = state => state.subscriptionsPage.activeTabIndex;
const selectActiveDetailsTab = state => state.subscriptionsPage.activeDetailsTab;

// computed selector
const selectSelectedChannelWithSubscribeStatus = createSelector(
  selectSelectedChannel,
  selectSubscriptions,
  (channel, subscriptions) => {
    if(channel.error || channel.isFetching || !channel.data ||
        subscriptions.error || subscriptions.isFetching || !subscriptions.data) {
      return channel;
    }

    return objectAssign({}, channel, {
      data: objectAssign({}, channel.data, {
        subscribed: subscriptions.data[channel.data.id]? true : false
      })
    });
  }
);

module.exports = {
  selectSubscriptions,
  selectSelectedChannel,
  selectChannelMostUploaded,
  selectNewestChannels,
  selectChannelList,
  selectActiveTabIndex,
  selectActiveDetailsTab,
  
  // computed selector
  selectSelectedChannelWithSubscribeStatus
};
