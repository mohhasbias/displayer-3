/* global require */

const page = require('page');
const yo = require('yo-yo');

const store = require('./shared/store');
const displayPreviewRoute = require('./pages/display-preview/route');
const displayRoute = require('./pages/display/route');

// attach pages, each contain route
// require('./pages/display');
require('./pages/login');
require('./pages/subscriptions');
require('./pages/logout');

// global css for all pages
require('./app.scss');

// set routes
page(displayPreviewRoute.urlPath, (ctx) => renderPage(ctx, displayPreviewRoute));
page(displayRoute.urlPath, (ctx) => renderPage(ctx, displayRoute));

// default route
page('/', () => page.redirect('/display'));
page('*', () => document.getElementById('app').innerHTML = '<h1>404 - Not Found</h1>');
// start router
page.start();

////////////////////////////////////
function renderPage(ctx, route) {
  // execute on enter path
  route.onEnterPath(ctx);
  // initial render
  renderToDOM(
    document.getElementById('app'),
    route.component()
  );
  // re-render on any store change
  const unsubscribe = store.subscribe(() => {
    renderToDOM(
      document.getElementById('app'),
      route.component()
    );
  });
  // unsubscribe store on path exit
  page.exit(route.urlPath, (ctx, next) => {
    unsubscribe();
    if(route.onExitPath) {
      route.onExitPath(ctx, next);
    } else {
      next();
    }
  });
}

function renderToDOM(dom, html) {
  const container = dom.cloneNode(false);
  container.appendChild(html);
  yo.update(
    dom,
    container    
  );
}
