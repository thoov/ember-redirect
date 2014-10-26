import Ember from 'ember';
import routeReopen from '../utils/route-reopen';

var mockRouter = {
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
    container: null
};


export default function(container) {
    mockRouter.container = container;
    return mockRouter;
}
