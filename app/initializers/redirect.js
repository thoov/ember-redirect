import Ember from 'ember';
import createNewMockRouter from 'ember-redirect/mocks/router';

export default {
    name: 'redirect',

    initialize: function(container, app) {
        var router = container.lookup('router:main'),
            routerCallbacks = router.router.callbacks,
            mockRouter = createNewMockRouter(container);

        routerCallbacks.forEach(function(callback, index) {
            callback.call(mockRouter, this);
        }, this);
    }
};
