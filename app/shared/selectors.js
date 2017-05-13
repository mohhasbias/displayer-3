/* global require, module */
const channelConstants = require('./reducers/channels/constants');

const selectSubscriptions = state => state.subscriptions;
const selectSelectedChannel = state => state.subscriptionsPage.selectedChannel;
const selectChannelMostUploaded = state => state.channels[channelConstants.ORDER_TOTAL];
const selectNewestChannels = state => state.channels[channelConstants.ORDER_DATE_CREATED];
const selectChannelList = state => state.channels[channelConstants.ORDER_NONE];
const selectActiveTabIndex = state => state.subscriptionsPage.activeTabIndex;
const selectActiveDetailsTab = state => state.subscriptionsPage.activeDetailsTab;

module.exports = {
  selectSubscriptions,
  selectSelectedChannel,
  selectChannelMostUploaded,
  selectNewestChannels,
  selectChannelList,
  selectActiveTabIndex,
  selectActiveDetailsTab
};
