var page = require('page');
var $ = require('jquery');

var displayPage = require('./pages/display');
var loginPage = require('./pages/login');
var subscriptionsPage = require('./pages/subscription');
var displayPreviewPage = require('./pages/display-preview');
var logoutPage = require('./pages/logout');

// global css for all pages
require('./app.scss');

// default route
page('/', () => page.redirect('/display'));
page('*', () => document.getElementById('app').innerHTML = '<h1>404 - Not Found</h1>');

// start router
page.start();
