var page = require('page');

page('/logout', () => {
  page.redirect('/');
});
