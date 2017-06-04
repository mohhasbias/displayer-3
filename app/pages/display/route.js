/* global module, require */
const $ = require('jquery');
const page = require('page');
const keycodes = require('keycode-js');

const store = require('../../shared/store');
const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');

const component = require('./connect');

const urlPath = '/display';
// routing
const onEnterPath = (ctx) => {
  if(!ctx.init) {
    enterTransition();
  }
  // keybinding
  $(document.body).keyup(keyboardNavigation);
  subscriptionsEffects.fetchSubscriptions('userId')(store.dispatch);
};

const onExitPath = (ctx, next) => {
  $(document.body).off('keyup', keyboardNavigation);
  next();
};

module.exports = {
  urlPath,
  onEnterPath,
  onExitPath,
  component
}

/////////////////////////////////////
function enterTransition() {
  // append old page
  var oldPage = $('#app').children().first().clone();
  $(document.body).append(oldPage);

  if(oldPage.length < 1) {
    return;
  }

  var originalCSS = {
    position: $('#app').css('position'),
    zIndex: $('#app').css('zIndex'),
    top: $('#app').css('top'),
    left: $('#app').css('left'),
    right: $('#app').css('right')
  };

  $('#app').css({
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0
  });

  // apply animation
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var animationClass = 'animated slideOutUp';
  $(oldPage).addClass(animationClass);
  $(oldPage).one(animationEnd, function() {
    $('#app').css(originalCSS);
    oldPage.remove();
  });
}

function keyboardNavigation(evt) {
  if(evt.keyCode === keycodes.KEY_ESCAPE) {
    page.redirect('/login');
  }
}
