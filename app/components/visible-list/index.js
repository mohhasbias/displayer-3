/* global require, module */

const yo = require('yo-yo');

module.exports = function({ subscriptions, onToggleVisible }) {
  require('./index.scss');

  return yo`
    <div class="panel panel-default visible-list">
      <div class="panel-heading">
        <h3 class="panel-title">Subscribed channel</h3>
      </div>
      <div class="list-group">
        ${Object.keys(subscriptions).map(key => {
          let visible = subscriptions[key].visible;
          return yo`
            <div class="list-group-item">
              <div class="list-group-item-text">
                ${(visible || '') &&
                  yo`<span class="text-primary">${subscriptions[key].channelName}</span>`
                }
                ${(!visible || '') &&
                  yo`<s class="text-muted">${subscriptions[key].channelName}</s>`
                }
                <div class="pull-right">
                  <a 
                    href="javascript:;" 
                    class="btn btn-link btn-xs" 
                    onclick=${() => onToggleVisible(subscriptions[key].id)}
                    >
                    ${(visible || '') &&
                      yo`<i class="fa fa-eye icon-visible"></i>`
                    }
                    ${(!visible || '') &&
                      yo`<i class="fa fa-eye-slash icon-invisible text-muted"></i>`
                    }
                  </a>
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
};
