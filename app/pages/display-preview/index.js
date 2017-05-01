/* global require, module */

const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const page = require('page');
const EventEmitter = require('events').EventEmitter;

// components
const layout = require('../../components/layout');
const subscriptionsList = require('../../components/subscriptions-list');

// routing
page('/display-preview', () => {
  const initialState = {
    subscriptions: {
      "eWRhpRV": require('../../../data/channel-details-eWRhpRV.json'),
      "23TplPdS": require('../../../data/channel-details-23TplPdS.json')
    }
  };

  setInitialState(initialState);

  subscribeToStateChange(displayPreviewPage);

  displayPreviewPage();
});

// page state
function setInitialState(initialState) {
  this.state = initialState;
}

function setState(partialState) {
  this.state = Object.assign({}, getState(), partialState);
  console.log(getState());
  // emit page state event
  this.listeners && this.listeners.forEach(listener => listener());
}

function getState() {
  return this.state;
}

function subscribeToStateChange(listener) {
  this.listeners = this.listeners || [];
  this.listeners.push(listener);
}

// page handler
function onSelectChannel(channelId) {
  console.log('select channel: ', channelId);
  setSelectedChannel(channelId);
}

// state modifier
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

// render function
function displayPreviewPage() {
  var html = yo`
    ${layout({
      loggedIn: true,
      children: yo`
        <div class="container">
          <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
              <h1>Display Preview Page</h1>
              ${subscriptionsList({
                subscriptions: getState().subscriptions,
                selectedChannel: getState().selectedChannel,
                onSelectChannel: onSelectChannel
              })}
            </div>
          </div>
        </div>
      `
    })}
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);
}

module.exports = displayPreviewPage;
