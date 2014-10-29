import Ember from 'ember';
import reopenRoute from 'ember-redirect/reopen-route';

export default {
    name: 'redirect',

    initialize: function(container, application) {
        var router = container.lookup('router:main'),
            routeNames = (router && router.redirects) ? Ember.keys(router.redirects) : [];

        // The user has specified the redirects on the router object instead of the map function
        // so we should use those instead of invoking the map function
        if(router.redirects && routeNames.length > 0) {
            Ember.EnumerableUtils.forEach(routeNames, function(routeName) {
                reopenRoute(routeName, { redirect: router.redirects[routeName] }, container, application);
            });
        }
    }
};
