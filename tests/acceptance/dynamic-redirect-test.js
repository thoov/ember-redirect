import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('Dynamic segments will redirect - Integration', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, App.destroy);
	}
});

test('Account route will redirect to the user route', function() {
	expect(2);

	visit('/account/13/other/76').then(function() {
		var appController = App.__container__.lookup('controller:application');

		strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
		strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
	});
});
