/* global require, module */

var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');
var $ = require('jquery');

// load jquery plugin
require('bootstrap-3-typeahead');

// components
const layout = require('../../components/layout');
const firstSubscriptions = require('../../components/first-subscriptions');
const navTabDetails = require('../../components/nav-tab-details');
const subscriptionsList = require('../../components/subscriptions-list');

// root state
const store = require('../../shared/store');
const channelActions = require('../../shared/reducers/channels/actions');

// routing
page('/subscriptions', () => {
  // set initial state
  setInitialState(initialState);
  // append root state to page state
  store.subscribe(() => mapStoreToState(store));
  // load required data
  store.dispatch(channelActions.fetchChannelList(store.dispatch));
  store.dispatch(channelActions.fetchChannelMostUploaded(store.dispatch));
  store.dispatch(channelActions.fetchNewestChannels(store.dispatch));
});

// append store to page state
function mapStoreToState(store) {
  setState({
    channels: channelActions.selectChannelList(store.getState()).items,
    mostUploadedContent: channelActions.selectChannelMostUploaded(store.getState()).items,
    newestChannel: channelActions.selectNewestChannels(store.getState()).items
  });
}

// page state
const initialState = {
  subscriptions: {
    "eWRhpRV": require('../../../data/channel-details-eWRhpRV.json'),
    "23TplPdS": require('../../../data/channel-details-23TplPdS.json')
  },

  // selectedChannel: require('../../../data/channel-details.json'),
  activeTabIndex: 0,
  activeDetailsTab: 'Contents'
};

// page state tool
function setInitialState(initialState) {
  this.state = initialState;
}

function setState(partialState) {
  this.state = Object.assign({}, getState(), partialState);
  // console.log(getState());
  // re-render page
  subscriptionPage();
}

function getState() {
  return this.state;
}

// page state helper
function isSubscribed(channelId) {
  return getState().subscriptions[channelId]? true: false;
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
function onTabSelect(index) {
  setState({
    activeTabIndex: index
  });
}

function onTabDetailsSelect(tabName) {
  setState({
    activeDetailsTab: tabName
  });
}

function onSearchInputChange(channel) {
  setSelectedChannel(channel.id);
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

function onItemClick() {
  setState({
    selectedChannel: require('../../../data/channel-details.json')
  });
}

function onLogout() {
  setInitialState(initialState);
  page.redirect('/logout');
}

// render function
function subscriptionPage() {
  // inject css
  require('./index.scss');

  // data preparation
  var mostUploadedContent = getState().mostUploadedContent;
  mostUploadedContent = mostUploadedContent.map( channel => {
    return Object.assign({}, channel, {
      total: `${channel.total} contents`
    });
  });

  var newestChannel = getState().newestChannel;

  var channels = getState().channels;
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
          ${(!Object.keys(getState().subscriptions).length || '') &&
            (!getState().selectedChannel || '') && 
            yo`
              <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                  ${firstSubscriptions({
                    onSearchInputChange: onSearchInputChange,
                    channels: channels,
                    labels: [ 'MOST UPLOADED CONTENT', 'NEWEST CHANNEL' ],
                    data: [ mostUploadedContent, newestChannel ],
                    activeTabIndex: getState().activeTabIndex,
                    onTabSelect: onTabSelect,
                    onItemClick: onItemClick
                  })}
                </div>
              </div>
            `}
          <div class="row">
            ${(Object.keys(getState().subscriptions).length || '') &&
              yo`
                <div class="col-sm-3 col-sm-offset-1">
                  ${subscriptionsList({
                    subscriptions: getState().subscriptions,
                    selectedChannel: getState().selectedChannel,
                    onSelectChannel: setSelectedChannel
                  })}
                </div>
              `
            }
            <div class="${Object.keys(getState().subscriptions).length? 'col-sm-7' : 'col-sm-10 col-sm-offset-1'}">
              ${(getState().selectedChannel || Object.keys(getState().subscriptions).length || '') &&
                yo`
                  <form class="search-form">
                    <div class="row">
                      <div class="col-sm-6">
                        <input 
                          id="search-input-small" 
                          type="text" 
                          class="form-control" 
                          onchange=${() => {
                            var item = $('#search-input-small').typeahead('getActive');
                            onSearchInputChange(item);
                          }}
                          autocomplete="off"
                          >
                      </div>
                    </div>
                  </form>
                `
              }
              ${(getState().selectedChannel || '') &&
                yo`
                  <div>
                    <div class="media">
                      <div class="media-left">
                        <a href="javascript:;">
                          <img class="media-object" src="${getState().selectedChannel.channelLogo}" alt="logo hima mmb">
                        </a>
                      </div>
                      <div class="media-body">
                        <h1 class="media-heading">${getState().selectedChannel.channelName}</h1>
                        <p class="text-muted">${`${getState().selectedChannel.contents.length} contents`}</p>
                      </div>
                      <div class="media-right">
                        ${(getState().selectedChannel.subscribed || '') &&
                          yo`
                            <button class="btn btn-danger" onclick=${onToggleSubscribe} >
                              unsubscribe
                            </button>
                          `
                        }
                        ${(!getState().selectedChannel.subscribed || '') &&
                          yo`
                          <button class="btn btn-success" onclick=${onToggleSubscribe} >
                            + subscribe
                          </button>
                          `
                        }
                      </div>
                    </div>
                    ${navTabDetails({
                      channel: getState().selectedChannel,
                      activeTab: getState().activeDetailsTab,
                      onTabSelect: onTabDetailsSelect,
                      colSize: Object.keys(getState().subscriptions).length? 'col-sm-4' : 'col-sm-2'
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

  // apply jquery plugin after DOM ready
  $('#search-input-small').typeahead('destroy');
  $('#search-input-small').typeahead({
    source: channels
  });
}

module.exports = subscriptionPage;
