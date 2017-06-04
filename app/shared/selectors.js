/* global require, module */
const { createSelector } = require('reselect');
const objectAssign = require('object-assign');
const _ = require('lodash');

const channelConstants = require('./reducers/channels/constants');

const selectSubscriptions = state => state.subscriptions;

const selectChannelMostUploaded = state => state.channels[channelConstants.ORDER_TOTAL];
const selectNewestChannels = state => state.channels[channelConstants.ORDER_DATE_CREATED];
const selectChannelList = state => state.channels[channelConstants.ORDER_NONE];

const selectSelectedChannel = state => state.subscriptionsPage.selectedChannel;
const selectActiveTabIndex = state => state.subscriptionsPage.activeTabIndex;
const selectActiveDetailsTab = state => state.subscriptionsPage.activeDetailsTab;

const selectSchedules = state => state.schedules;

// computed selector
const selectSelectedChannelWithSubscribeStatus = createSelector(
  selectSelectedChannel,
  selectSubscriptions,
  (channel, subscriptions) => {
    if(channel.error || channel.isFetching || _.isEmpty(channel.data) ||
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

const selectSubscriptionsWithSchedules = createSelector(
  selectSubscriptions,
  selectSchedules,
  (subscriptions, schedule) => {
    const data = Object.keys(subscriptions.data).reduce(
      (acc, channelId) => {
        acc[channelId] = Object.assign({}, subscriptions.data[channelId], {
          visible: schedule[channelId] || false
        })
        return acc; 
      },
      {}
    );

    return Object.assign({}, subscriptions, {
      data
    });
  }
);

const selectPlaylist = createSelector(
  selectSubscriptionsWithSchedules,
  (subscriptions) => {
    let playlist = Object.keys(subscriptions.data)
    .map(channelId => {
      return subscriptions.data[channelId].visible? subscriptions.data[channelId].contents : [];
    })
    .reduce(
      (acc, contents) => acc.concat(contents),
      []
    );
  
    playlist = playlist.length? playlist : null;

    return playlist;
  }
)

module.exports = {
  selectSubscriptions,
  selectSelectedChannel,
  selectChannelMostUploaded,
  selectNewestChannels,
  selectChannelList,
  selectActiveTabIndex,
  selectActiveDetailsTab,
  
  // computed selector
  selectSelectedChannelWithSubscribeStatus,
  selectSubscriptionsWithSchedules,
  selectPlaylist
};
