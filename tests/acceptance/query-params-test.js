import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Query params will be passed along - Integration', {
  setup: function() {
    App        = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('Account route will redirect to the user route including query param', function(assert) {
  assert.expect(1);

  visit('/account/13/other/76?page=2').then(function() {

    assert.strictEqual(currentURL(), '/user/13/something/76?page=2', 'Redirected url includes query param');
  });
});


test('Profile route will redirect to the user route including query params', function(assert) {
  assert.expect(1);

  visit('/profile/14/user/66?page=3&showDetails=true').then(function() {

    assert.strictEqual(currentURL(), '/user/66/something/14?page=3&showDetails=true', 'Redirected url includes query params');
  });
});
