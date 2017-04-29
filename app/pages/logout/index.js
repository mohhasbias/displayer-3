/* global require */

const page = require('page');

page('/logout', () => {
  page.redirect('/');
});
