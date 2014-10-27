import Ember from 'ember';
import reopenRoute from '../utils/route-reopen';

/*
    This is mock router contains 2 stub methods: route and resource. These are called when we invoke the map
    function a second time. Each route or resource within the router map function call these stub methods and
    then we look for the redirect property within the options object.
*/
var mockRouter = {
    /*
        This array holds names of parent resources. For example: the foo resource which has bar as a sub route
        would look like: ['foo', 'bar']
    */
    resourceNameChain: [],
    route: function(routeName, options) {
        var routeObject,
            basicRoute,
            routeConatinerKey;

        this.resourceNameChain.push(routeName);
        routeConatinerKey = 'route:' + this.resourceNameChain.join('.');
        routeObject = this.container.lookup(routeConatinerKey);

        // if the routeObject does not exist then we need to generate a basic route in its place
        if(!routeObject) {
            basicRoute = this.container.lookup('route:basic');
            this.application.register(routeConatinerKey, basicRoute);
            routeObject = this.container.lookup(routeConatinerKey);
        }

        reopenRoute(routeObject, options);
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

            reopenRoute(defaultResourceObject, options);
            reopenRoute(indexResourceObject, options);
        }

        subRoutes.call(this);
        this.resourceNameChain = [];
    },
    container: null,
    application: null
};


export default function(container, application) {
    mockRouter.container = container;
    mockRouter.application = application;
    return mockRouter;
}
