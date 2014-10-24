import Ember from 'ember';
import routeReopen from 'ember-redirect/utils/route-reopen';

export default {
  name: 'redirect',

    initialize: function(container, app) {
        app.deferReadiness();
        var router = container.lookup('router:main'),
            routerCallbacks = router.router.callbacks,
            mockRouter = {
                resourceNameChain: [],
                route: function(routeName, options) {
                    var routeObject;

                    this.resourceNameChain.push(routeName);
                    routeObject = this.container.lookup('route:' + this.resourceNameChain.join('.'));
                    routeReopen(routeObject, options);
                    this.resourceNameChain.pop();
                },
                resource: function(resourceName, options, subRoutes) {
                    var defaultResourceObject,
                        indexResourceObject;

                    this.resourceNameChain = [resourceName];

                    if(Ember.typeOf(options) === 'function') {
                        subRoutes = options;
                    }
                    else if(options.redirect) {
                        defaultResourceObject = this.container.lookup('route:' + resourceName);
                        indexResourceObject = this.container.lookup('route:' + resourceName + '.index');

                        routeReopen(defaultResourceObject, options);
                        routeReopen(indexResourceObject, options);
                    }

                    subRoutes.call(this);
                    this.resourceNameChain = [];
                },
                container: container
            };

        routerCallbacks.forEach(function(callback, index) {
            callback.call(mockRouter, this);

            if((index + 1) === routerCallbacks.length) {
                app.advanceReadiness();
            }
        }, this);
    }
};
