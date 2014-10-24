import Ember from 'ember';
import routeReopen from 'ember-redirect/utils/route-reopen';

export default {
  name: 'redirect',

  initialize: function(container, app) {
    app.deferReadiness();
    var router = container.lookup('router:main');
    var routerCallbacks = router.router.callbacks;
    var mockRouter = {
      resourceNameChain: [],
      route: function(routeName, options) {
        this.resourceNameChain.push(routeName);
        var route = this.container.lookup('route:' + this.resourceNameChain.join('.'));

        routeReopen(route, options);

        this.resourceNameChain.pop();
      },
      resource: function(resourceName, options, subRoutes) {

        this.resourceNameChain = [resourceName];

        if(Ember.typeOf(options) === 'function') {
          subRoutes = options;
        }
        else if(options.redirect) {
          var resource = this.container.lookup('route:' + resourceName);
          routeReopen(resource, options);

          resource = this.container.lookup('route:' + resourceName + '.index');
          routeReopen(resource, options);
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
