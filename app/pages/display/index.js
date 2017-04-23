var yo = require('yo-yo');
var diffhtml = require('diffhtml');
var bootstrap = require('bootstrap');
var $ = require('jquery');
var page = require('page');
var keycodes = require('keycode-js');

// routing
page('/display', (ctx) => {
  if(ctx.init) {
    displayPage();
  } else {
    enterTransition();
  }
});

page.exit('/display', (ctx, next) => {
  $(document.body).off('keyup');
  next();
});

function enterTransition() {
  console.log('enter display');
  // append old page
  var oldPage = $('#app').children().first().clone();
  $(document.body).append(oldPage);

  // clear out main DOM
  $('#app').empty();

  // render page
  displayPage();

  $('#app').css({
    position: 'absolute',
    zIndex: -1,
    top: 0
  });

  // apply animation
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var animationClass = 'animated slideOutUp';
  $(oldPage).addClass(animationClass);
  $(oldPage).one(animationEnd, function() {
    $('#app').css({
      position: 'static'
    });
    oldPage.remove();
  });
}

// page renderer
function displayPage() {
  // inject css
  require('./index.css');

  var carouselSetting = {
    interval: 3000,
    pause: null
  };

  // render template
  var html = yo`
    <div class="display-page carousel slide" data-ride="carousel" data-interval="${carouselSetting.interval}" data-pause="${carouselSetting.pause}">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li class="active"></li>
        <li></li>
        <li></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="assets/i/walrus.jpeg" alt="walrus">
        </div>
        <div class="item">
          <img src="assets/i/strawberry.jpeg" alt="strawberry">
        </div>
        <div class="item">
          <img src="assets/i/lion.jpeg" alt="lion">
        </div>
      </div>
    </div>
  `;

  // render to DOM
  diffhtml.innerHTML(
    document.getElementById('app'),
    html
  );

  // apply jquery plugins
  $('.display-page.carousel').carousel({
    interval: carouselSetting.interval,
    pause: carouselSetting.pause
  });

  // keybinding
  $(document.body).keyup(evt => {
    if(evt.keyCode === keycodes.KEY_ESCAPE) {
      page.redirect('/login');
    }
  });
}

module.exports = displayPage;
