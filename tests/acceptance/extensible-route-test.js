import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App, container, lookupFunc;

module('Redirect routes are extensible - Integration', {
    setup: function() {
        App = startApp();
        container = App.__container__;
        lookupFunc = container.lookup;
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    }
});

test('Dog route extends from sample and does not redirect', function() {
    expect(3);

    visit('/dog').then(function() {
        var appController = lookupFunc.call(container, 'controller:application'),
            appRoute = lookupFunc.call(container, 'route:application'),
            locationPath = appRoute.router.location.path;

        strictEqual(appController.get('currentPath'), 'dog', 'Dog route does not redirect and stays on dog');
        strictEqual(appController.get('currentRouteName'), 'dog', 'Dog route does not redirect and stays on dog');
        strictEqual(locationPath, '/dog', 'Dog route does not redirect and stays on dog');
    });
});
