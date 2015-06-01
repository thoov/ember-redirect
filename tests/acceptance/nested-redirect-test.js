import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App, container, lookupFunc;

module('Nested resources will redirect - Integration', {
  setup: function() {
    App        = startApp();
    container  = App.__container__;
    lookupFunc = container.lookup;
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('routes within resources can redirect to the correct location', function() {
  expect(9);

  visit('/testing/bar/cat').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');
    var locationPath  = appRoute.router.location.path;

    strictEqual(appController.get('currentPath'), 'bar', 'Bar.cat route will not redirect and stay on the correct path');
    strictEqual(appController.get('currentRouteName'), 'bar', 'Bar.cat route will not redirect and stay on the correct route');
    strictEqual(locationPath, '/bar', 'Bar.cat will redirect to the correct url location');
  });

  visit('/testing/foo').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');
    var locationPath  = appRoute.router.location.path;

    strictEqual(appController.get('currentPath'), 'bar', 'Testing.foo route will redirect to the correct path');
    strictEqual(appController.get('currentRouteName'), 'bar', 'Testing.foo routewill redirect to the correct route');
    strictEqual(locationPath, '/bar', 'Testing.foo route will redirect to the correct url location');
  });

  visit('/testing/bar/world').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute = lookupFunc.call(container, 'route:application');
    var locationPath = appRoute.router.location.path;

    strictEqual(appController.get('currentPath'), 'testing.hello', 'Bar.world route will redirect to the correct path');
    strictEqual(appController.get('currentRouteName'), 'testing.hello', 'Bar.world routewill redirect to the correct route');
    strictEqual(locationPath, '/testing/hello', 'Bar.world route will redirect to the correct url location');
  });
});
