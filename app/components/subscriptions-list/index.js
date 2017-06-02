/* global require, module */

const yo = require('yo-yo');

module.exports = function({ subscriptions, selectedChannel, onSelectChannel }) {
  return yo`
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">List of subscribed channel</h3>
      </div>
      <div class="list-group">
        ${Object.keys(subscriptions).map(key => {
          var activeClass = selectedChannel && subscriptions[key].id === selectedChannel.id? 'active' : '';

          return yo`
            <a 
              href="javascript:;"
              class="list-group-item ${activeClass}"
              onclick=${() => onSelectChannel(subscriptions[key].id)}
            >
              <span class="badge">${subscriptions[key].contents.length}</span>
              ${subscriptions[key].channelName}
            </a>
          `;
        })}
      </div>
    </div>
  `;
};
