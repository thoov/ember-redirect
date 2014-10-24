import Ember from 'ember';

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

        if(!route) {
          return;
        }

        route.reopen({
            beforeModel: function() {
              if(options && options.redirect) {
                this.replaceWith(options.redirect);
              }
            }
        });

        this.resourceNameChain.pop();
      },
      resource: function(resourceName, options, subRoutes) {

        if(Ember.typeOf(options) === 'function') {
          subRoutes = options;
        }

        this.resourceNameChain = [resourceName];
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
