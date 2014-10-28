import Ember from 'ember';
import reopenRoute from '../utils/route-reopen';

/*
    This is mock router contains 2 stub methods: route and resource. These are called when we invoke the map
    function a second time. Each route or resource within the router map function call these stub methods and
    then we look for the redirect property within the options object.
*/
var mockRouter = {
    container: null,
    application: null,

    /*
        This array holds names of parent resources. For example: the foo resource which has bar as a sub route
        would look like: ['foo', 'bar']
    */
    resourceNameChain: [],
    route: function(routeName, options) {
        this.resourceNameChain.push(routeName);
        this.addRedirectToRoute(this.resourceNameChain.join('.'), options);
        this.resourceNameChain.pop();
    },
    resource: function(resourceName, options, subRoutes) {
        this.resourceNameChain = [resourceName];

        if(Ember.typeOf(options) === 'function') {
            subRoutes = options;
        }
        else if(options.redirect) {
            this.addRedirectToRoute(resourceName, options); // TODO: not sure if this is needed
            this.addRedirectToRoute(resourceName + '.index', options);
        }

        subRoutes.call(this);
        this.resourceNameChain = [];
    },
    addRedirectToRoute: function(routeName, options) {
        return reopenRoute(routeName, options, this.container, this.application);
    }
};

export default function(container, application) {
    mockRouter.container = container;
    mockRouter.application = application;
    return mockRouter;
}
