/* global require, module */

const yo = require('yo-yo');
const page = require('page');
const $ = require('jquery');
const keycodes = require('keycode-js');

const store = require('../../shared/store');
const selectors = require('../../shared/selectors');
// mock
selectors.selectErrorMessage = () => null;

const layout = require('../../components/layout');

// routing
page('/login', (ctx) => {
  if(ctx.init) {
    loginPage(mapStoreToPage());
  } else {
    enterTransition();
  }
});

page.exit('/login', (ctx, next) => {
  $(document.body).off('keyup');
  next();
});

function enterTransition() {
  // append old page
  var oldPage = $('#app').children().first().clone();
  oldPage.css({
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0
  });
  $(document.body).append(oldPage);

  // clear out main DOM
  $('#app').empty();

  // render page
  loginPage(mapStoreToPage());

  // apply animation
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var animationClass = 'animated slideInDown';
  $('#app').addClass(animationClass);
  $('#app').one(animationEnd, function() {
    oldPage.remove();
    $('#app').removeClass(animationClass);
  });
}

function mapStoreToPage() {
  return {
    errorMessage: selectors.selectErrorMessage(store.getState())
  };
}

function login(evt) {
  evt.preventDefault();
  var user = $('.login-form').get(0).email.value;
  var pass = $('.login-form').get(0).password.value;
  var loggedIn = user && user.length > 0 && pass && pass.length > 0;
  if(loggedIn) {
    page.redirect('/subscriptions');
  } else {
    // set login error
    var errorMessage = 'username or password doesn\'t match';
    selectors.selectErrorMessage = () => errorMessage;
    loginPage(mapStoreToPage());
  }
}

function loginPage({ errorMessage }) {
  require('./index.scss');

  var html = yo`
    ${layout({
      children: yo`
        <div class="container login-page">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
              <form class="login-form">
                ${(errorMessage || '') &&
                  yo`
                    <div class="alert alert-danger" role="alert">
                      ${errorMessage}
                    </div>
                  `
                }
                <h1>LOG IN</h1>
                <div class="form-group">
                  <input type="email" class="form-control input-lg" placeholder="User ID" name="email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control input-lg" placeholder="Password" name="password">
                </div>
                <button onclick=${login} class="btn btn-default btn-lg">
                  LOG IN
                </button>
              </form>
            </div>
          </div>
        </div>
      `
    })}
  `;

  yo.update(
    document.getElementById('app'),
    yo`<div id="app">${html}</div>`
  );

  $(document.body).keyup(evt => {
    if (evt.keyCode === keycodes.KEY_ESCAPE) {
      page.redirect('/display');
    }
  });
}

module.exports = loginPage;
