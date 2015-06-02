import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App, container, lookupFunc;

module('Dynamic segments will redirect - Integration', {
  setup: function() {
    App        = startApp();
    container  = App.__container__;
    lookupFunc = container.lookup;
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('Account route will redirect to the user route', function(assert) {
  assert.expect(2);

  visit('/account/13/other/76').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');

    assert.strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
    assert.strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
  });
});


test('Account route will redirect to the user route', function(assert) {
  assert.expect(2);

  visit('/profile/14/user/66').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');

    assert.strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
    assert.strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
  });
});
