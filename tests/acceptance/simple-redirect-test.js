import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App, container, lookupFunc;

module('Simple routes will redirect - Integration', {
  setup: function() {
    App        = startApp();
    container  = App.__container__;
    lookupFunc = container.lookup;
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('the base case where not specifing a redirect will not redirect', function(assert) {
  assert.expect(4);

  visit('/something').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');

    assert.strictEqual(appController.get('currentPath'), 'something', 'Something route will not redirect and stay on the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'something', 'Something route will not redirect and stay on the correct route');
  });

  visit('/testing/bar').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');

    assert.strictEqual(appController.get('currentPath'), 'testing.bar.index', 'Something route will not redirect and stay on the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'bar.index', 'Something route will not redirect and stay on the correct route');
  });
});

test('basic route to route redirects are performed correctly', function(assert) {
  assert.expect(4);

  visit('/sample').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');

    assert.strictEqual(appController.get('currentPath'), 'something', 'Sample route will redirect to the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'something', 'Sample route will redirect to the correct route');
  });

  visit('/login').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');

    assert.strictEqual(appController.get('currentPath'), 'foo', 'Login route will redirect to the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'foo', 'Login route will redirect to the correct route');
  });
});


test('basic resource to route redirects are performed correctly', function(assert) {
  assert.expect(2);

  visit('/testing').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');

    assert.strictEqual(appController.get('currentPath'), 'something', 'Testing resource will redirect to the correct path');
    assert.strictEqual(appController.get('currentRouteName'), 'something', 'Testing resource will redirect to the correct route');
  });
});
