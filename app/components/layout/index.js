var yo = require('yo-yo');

// components
var header = require('../header');

// render function
module.exports = function({ className, children, loggedIn, onLogout }) {
  // inject css
  require('./index.scss');

  return yo`
    <div class="layout ${ className || '' }">
      ${header({
        loggedIn: loggedIn,
        onLogout: onLogout
      })}
      ${children}
    </div>
  `;
};