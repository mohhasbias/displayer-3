/* global require, module */

const yo = require('yo-yo');
const page = require('page');

// capture active path through page middleware
var activePath;
page('*', (ctx, next) => {
  activePath = ctx.path;
  next();
});

// render function
module.exports = function({ loggedIn, onLogout }) {
  // inject css
  require('./index.scss');
  
  return yo`
    <header class="header-component">
      <div class="container">
        <img class="logo" src="assets/i/logo.png" alt="logo">
        ${loggedIn && 
          yo`
            <ul class="nav nav-pills">
              <li role="presentation" class="${activePath === '/subscriptions'? 'active' : ''}">
                <a href="/subscriptions">SUBSCRIPTIONS</a>
              </li>
              <li role="presentation" class="${activePath === '/display-preview'? 'active' : ''}">
                <a href="/display-preview">DISPLAY PREVIEW</a>
              </li>
              <li role="presentation" class="pull-right">
                <a href="javascript:;" onclick=${onLogout} >LOGOUT</a>
              </li>
            </ul>
          `
        }
      </div>
    </header>
  `;
};