/* global require, module */

const yo = require('yo-yo');
const shortid = require('shortid');
const $ = require('jquery');

module.exports = function({ subscriptions, selectedChannel, onSelectChannel }) {
  return yo`
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">List of subscribed channel</h3>
      </div>
      <div class="list-group">
        ${Object.keys(subscriptions).map(key => {
          var activeClass = selectedChannel && subscriptions[key].id === selectedChannel.id? 'active' : '';
          var anchorId = shortid.generate();
          var anchorSelector = `#${anchorId}`;

          $(anchorSelector).ready(() => {
            $(anchorSelector).off('click');
            $(anchorSelector).on('click', () => {
              onSelectChannel && onSelectChannel(subscriptions[key].id)
            });
          });

          return yo`
            <a 
              id="${anchorId}"
              href="javascript:;"
              class="list-group-item ${activeClass}"
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
