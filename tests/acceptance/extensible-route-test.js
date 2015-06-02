import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App, container, lookupFunc;

module('Redirect routes are extensible - Integration', {
  setup: function() {
    App        = startApp();
    container  = App.__container__;
    lookupFunc = container.lookup;
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('Dog route extends from sample and does not redirect', function(assert) {
  assert.expect(3);

  visit('/dog').then(function() {
    var appController = lookupFunc.call(container, 'controller:application');
    var appRoute      = lookupFunc.call(container, 'route:application');
    var locationPath  = appRoute.router.location.path;

    assert.strictEqual(appController.get('currentPath'), 'dog', 'Dog route does not redirect and stays on dog');
    assert.strictEqual(appController.get('currentRouteName'), 'dog', 'Dog route does not redirect and stays on dog');
    assert.strictEqual(locationPath, '/dog', 'Dog route does not redirect and stays on dog');
  });
});
