/* global require, module */

var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');

// components
const layout = require('../../components/layout');
const firstSubscriptions = require('../../components/first-subscriptions');
const navTabDetails = require('../../components/nav-tab-details');
const subscriptionsList = require('../../components/subscriptions-list');
const inputTypeahead = require('../../components/input-typeahead');

// root state
const store = require('../../shared/store');
const channelActions = require('../../shared/reducers/channels/actions');
const channelEffects = require('../../shared/reducers/channels/effects');
const subscriptionsPageActions = require('../../shared/reducers/subscriptions-page/actions');
const subscriptionsPageEffects = require('../../shared/reducers/subscriptions-page/effects');
const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');

// routing
page('/subscriptions', () => {
  // subscribe store updates
  store.subscribe(() => {
    // re-render
    subscriptionPage({
      mostUploadedContent: channelActions.selectChannelMostUploaded(store.getState()).data, 
      newestChannel: channelActions.selectNewestChannels(store.getState()).data, 
      channels: channelActions.selectChannelList(store.getState()).data, 
      subscriptions: store.selectSubscriptions().data,
      selectedChannel: store.selectSelectedChannel().error? null : store.selectSelectedChannel().data,
      activeTabIndex: subscriptionsPageActions.selectActiveTabIndex(store.getState()),
      activeDetailsTab: subscriptionsPageActions.selectActiveDetailsTab(store.getState()),
      onTabSelect: (index) => {
        store.dispatch(subscriptionsPageActions.setActiveTabIndex(index));
      },
      onItemClick: (channelId) => {
        subscriptionsPageEffects.fetchSelectedChannel(channelId)(store.dispatch);
      },
      onSearchInputChange: (channel) => {
        if(channel) {
          subscriptionsPageEffects.fetchSelectedChannel(channel.id)(store.dispatch);
        }
      },
      onTabDetailsSelect: (tabName) => {
        store.dispatch(subscriptionsPageActions.setActiveDetailsTab(tabName));
      }
    });
  });
  // load required data
  // handover dispatch to effects
  channelEffects.fetchChannelList()(store.dispatch);
  channelEffects.fetchChannelMostUploaded()(store.dispatch);
  channelEffects.fetchNewestChannels()(store.dispatch);
  subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
});

// page state helper
function isSubscribed(channelId) {
  return store.getState().subscriptions[channelId]? true: false;
}

// state modifier
function setSelectedChannel(channelId) {
  var channelDetails = {};
  switch(channelId) {
    case 'eWRhpRV':
      channelDetails = require('../../../data/channel-details-eWRhpRV.json');
      break;
    case '23TplPdS':
      channelDetails = require('../../../data/channel-details-23TplPdS.json');
      break;
    case '46Juzcyx':
      channelDetails = require('../../../data/channel-details-46Juzcyx.json');
  }

  setState({
    selectedChannel: Object.assign({}, channelDetails, {
      subscribed: isSubscribed(channelDetails.id)
    })
  });
}

// event handler
function onTabDetailsSelect(tabName) {
  setState({
    activeDetailsTab: tabName
  });
}

function onToggleSubscribe() {
  setState({
    selectedChannel: Object.assign({}, getState().selectedChannel, {
      subscribed: !getState().selectedChannel.subscribed
    })
  });
  // update subscriptions
  if(getState().selectedChannel.subscribed) {
    setState({
      subscriptions: Object.assign({}, getState().subscriptions, {
        [getState().selectedChannel.id]: getState().selectedChannel
      })
    });  
  } else {
    delete getState().subscriptions[getState().selectedChannel.id];
    setState({
      subscriptions: getState().subscriptions
    });
  }
}

function onLogout() {
  page.redirect('/logout');
}

// render function
function subscriptionPage({ 
  mostUploadedContent, 
  newestChannel, 
  channels, 
  subscriptions,
  selectedChannel,
  activeTabIndex,
  activeDetailsTab,
  onTabSelect,
  onItemClick,
  onSearchInputChange,
  onTabDetailsSelect
}) {
  // inject css
  require('./index.scss');

  // data preparation
  mostUploadedContent = mostUploadedContent.map( channel => {
    return Object.assign({}, channel, {
      total: `${channel.total} contents`
    });
  });

  channels = channels.map(channel => {
    return Object.assign({}, channel, {
      name: channel.channelName
    });
  });

  // html template
  var html = yo`
    ${layout({
      loggedIn: true,
      onLogout: onLogout,
      className: 'subscriptions-page',
      children: yo`
        <div class="container container-subscriptions">
          ${(!Object.keys(subscriptions).length || '') &&
            (!selectedChannel || '') && 
            yo`
              <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                  ${firstSubscriptions({
                    onSearchInputChange: onSearchInputChange,
                    channels: channels,
                    labels: [ 'MOST UPLOADED CONTENT', 'NEWEST CHANNEL' ],
                    data: [ mostUploadedContent, newestChannel ],
                    columns: [ ['channelName', 'total'], ['channelName', 'timeago'] ],
                    activeTabIndex: activeTabIndex,
                    onTabSelect: onTabSelect,
                    onItemClick: onItemClick
                  })}
                </div>
              </div>
            `}
          <div class="row">
            ${(Object.keys(subscriptions).length || '') &&
              yo`
                <div class="col-sm-3 col-sm-offset-1">
                  ${subscriptionsList({
                    subscriptions: subscriptions,
                    selectedChannel: selectedChannel,
                    onSelectChannel: setSelectedChannel
                  })}
                </div>
              `
            }
            <div class="${Object.keys(subscriptions).length? 'col-sm-7' : 'col-sm-10 col-sm-offset-1'}">
              ${(selectedChannel || Object.keys(subscriptions).length || '') &&
                yo`
                  <form class="search-form">
                    <div class="row">
                      <div class="col-sm-6">
                        ${inputTypeahead({
                          source: channels,
                          onSearchInputChange: onSearchInputChange
                        })}
                      </div>
                    </div>
                  </form>
                `
              }
              ${(selectedChannel || '') &&
                yo`
                  <div>
                    <div class="media">
                      <div class="media-left">
                        <a href="javascript:;">
                          <img class="media-object" src="${selectedChannel.channelLogo}" alt="logo hima mmb">
                        </a>
                      </div>
                      <div class="media-body">
                        <h1 class="media-heading">${selectedChannel.channelName}</h1>
                        <p class="text-muted">${`${selectedChannel.contents.length} contents`}</p>
                      </div>
                      <div class="media-right">
                        ${(selectedChannel.subscribed || '') &&
                          yo`
                            <button class="btn btn-danger" onclick=${onToggleSubscribe} >
                              unsubscribe
                            </button>
                          `
                        }
                        ${(!selectedChannel.subscribed || '') &&
                          yo`
                          <button class="btn btn-success" onclick=${onToggleSubscribe} >
                            + subscribe
                          </button>
                          `
                        }
                      </div>
                    </div>
                    ${navTabDetails({
                      channel: selectedChannel,
                      activeTab: activeDetailsTab,
                      onTabSelect: onTabDetailsSelect,
                      colSize: Object.keys(subscriptions).length? 'col-sm-4' : 'col-sm-2'
                    })}
                  </div>
                `
              }
            </div>
          </div>
        </div>
      `
    })}
  `;

  // render to DOM
  diffhtml.innerHTML(document.getElementById('app'), html);
}

module.exports = subscriptionPage;
