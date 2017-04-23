var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');

var layout = require('../../components/layout');

page('/display-preview', () => {
  displayPreviewPage();
});

function displayPreviewPage() {
  var html = yo`
    ${layout({
      loggedIn: true,
      children: yo`
        <h1>Display Preview Page</h1>
      `
    })}
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);
}

module.exports = displayPreviewPage;
