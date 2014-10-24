import Ember from 'ember';
import createMockRouter from 'ember-redirect/mocks/router';

export default {
    name: 'redirect',

    initialize: function(container, app) {
        var router = container.lookup('router:main'),
            routerCallbacks = router.router.callbacks,
            mockRouter = createMockRouter(container);

        routerCallbacks.forEach(function(callback, index) {
            callback.call(mockRouter, this);
        }, this);
    }
};
