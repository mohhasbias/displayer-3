/* global require */

const page = require('page');

// attach pages
require('./pages/display');
require('./pages/login');
require('./pages/subscription');
require('./pages/display-preview');
require('./pages/logout');

// global css for all pages
require('./app.scss');

// default route
page('/', () => page.redirect('/display'));
page('*', () => document.getElementById('app').innerHTML = '<h1>404 - Not Found</h1>');

// start router
page.start();
