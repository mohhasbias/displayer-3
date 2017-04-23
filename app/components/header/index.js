var yo = require('yo-yo');

module.exports = function() {
  require('./index.scss');
  
  return yo`
    <header class="header-component">
      <div class="container">
        <img class="logo" src="assets/i/logo.png" alt="logo">
      </div>
    </header>
  `;
};