import Ember from 'ember';
import createMockRouter from 'ember-redirect/mocks/router';
import reopenRoute from 'ember-redirect/utils/route-reopen';

export default {
    name: 'redirect',

    initialize: function(container, application) {
        var router = container.lookup('router:main'),
            routerCallbacks = router.router.callbacks,
            mockRouter = createMockRouter(container, application),
            routeNames = (router && router.redirects) ? Ember.keys(router.redirects) : [];

        // The user has specified the redirects on the router object instead of the map function
        // so we should use those instead of invoking the map function
        if(router.redirects && routeNames.length > 0) {
            Ember.EnumerableUtils.forEach(routeNames, function(routeName) {
                reopenRoute(routeName, { redirect: router.redirects[routeName] }, container, application);
            });
        }
        else {
            routerCallbacks.forEach(function(callback, index) {
                callback.call(mockRouter, this);
            }, this);
        }
    }
};
