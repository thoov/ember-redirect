import Ember from 'ember';
import { module, test } from 'qunit';
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

test('routes within resources can redirect to the correct location', function(assert) {
  assert.expect(6);

  visit('/testing/bar/cat').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');

    assert.strictEqual(appController.get('currentPath'), 'bar', 'Bar.cat route will not redirect and stay on the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'bar', 'Bar.cat route will not redirect and stay on the correct route');
  });

  visit('/testing/foo').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');

    assert.strictEqual(appController.get('currentPath'), 'bar', 'Testing.foo route will redirect to the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'bar', 'Testing.foo routewill redirect to the correct route');
  });

  visit('/testing/bar/world').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute = lookupFunc.call(container, 'route:application');

    assert.strictEqual(appController.get('currentPath'), 'testing.hello', 'Bar.world route will redirect to the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'testing.hello', 'Bar.world routewill redirect to the correct route');
  });
});
