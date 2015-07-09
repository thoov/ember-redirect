import Ember from 'ember';
import reopenRoute from 'ember-redirect/utils/reopen-route';

export default {
  name: 'redirect',

  initialize: function(instance) {
    var router     = instance.container.lookup('router:main');
    var routeNames = (router && router.redirects) ? Ember.keys(router.redirects) : [];

    // The user has specified the redirects on the router object instead of the map function
    // so we should use those instead of invoking the map function
    if(router.redirects && routeNames.length > 0) {
      routeNames.forEach(function(routeName) {
        reopenRoute(routeName, { redirect: router.redirects[routeName] }, instance);
      });
    }
  }
};
