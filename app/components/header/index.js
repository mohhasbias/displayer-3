var yo = require('yo-yo');
var page = require('page');

var activePath;
page('*', (ctx, next) => {
  activePath = ctx.path;
  next();
});

module.exports = function({ loggedIn }) {
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
              <li role="presentation" class="${activePath === '/logout'? 'active' : ''} pull-right">
                <a href="/logout">LOGOUT</a>
              </li>
            </ul>
          `
        }
      </div>
    </header>
  `;
};