var yo = require('yo-yo');

var header = require('../header');

module.exports = function({ className, children, loggedIn }) {
  require('./index.scss');

  return yo`
    <div class="layout ${ className || '' }">
      ${header({
        loggedIn: loggedIn
      })}
      ${children}
    </div>
  `;
};