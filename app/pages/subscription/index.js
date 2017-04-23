var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');

var layout = require('../../components/layout');

page('/subscriptions', () => {
  subscriptionPage();
});

function subscriptionPage() {
  var html = yo`
    ${layout({
      loggedIn: true,
      children: yo`
        <h1>Subscription Page</h1>
      `
    })}
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);
}

module.exports = subscriptionPage;
