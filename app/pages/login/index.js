var yo = require('yo-yo');
var diffhtml = require('diffhtml');
var page = require('page');
var $ = require('jquery');
var keycodes = require('keycode-js');

var layout = require('../../components/layout');
var pageActions = require('../../shared/reducers/page/actions');
var store = require('../../shared/store');

// routing
page('/login', (ctx) => {
  if(ctx.init) {
    loginPage();
  } else {
    enterTransition();
  }
});

page.exit('/login', (ctx, next) => {
  $(document.body).off('keyup');
  next();
});

function enterTransition() {
  console.log('enter login');
  // append old page
  var oldPage = $('#app').children().first().clone();
  oldPage.css({
    position: 'absolute',
    zIndex: -1,
    top: 0
  });
  $(document.body).append(oldPage);

  // clear out main DOM
  $('#app').empty();

  // render page
  loginPage();

  // apply animation
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var animationClass = 'animated slideInDown';
  $('#app').addClass(animationClass);
  $('#app').one(animationEnd, function() {
    oldPage.remove();
    $('#app').removeClass(animationClass);
  });
}

function login(evt) {
  evt.preventDefault();
  store.dispatch(pageActions.setLogin(true));
}

function loginPage() {
  require('./index.scss');

  var html = yo`
    ${layout({
      children: yo`
        <div class="container login-page">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
              <form class="login-form">
                <h1>LOG IN</h1>
                <div class="form-group">
                  <input type="email" class="form-control input-lg" placeholder="User ID">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control input-lg" placeholder="Password">
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

  diffhtml.innerHTML(document.getElementById('app'), html);

  $(document.body).keyup(evt => {
    if (evt.keyCode === keycodes.KEY_ESCAPE) {
      page.redirect('/display');
    }
  });

  store.subscribe(() => {
    var { loggedIn } = pageActions.selectPage(store.getState());
    if (loggedIn) {
      page.redirect('/subscriptions');
    }
  });
}

module.exports = loginPage;
