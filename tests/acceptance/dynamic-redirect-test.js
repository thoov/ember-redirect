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
	expect(3);

	visit('/account/13/other/76').then(function() {
		var appController = App.__container__.lookup('controller:application');
		var appRouter = App.__container__.lookup('route:application');

		strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
		strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
		strictEqual(appRouter.router.location.path, '/user/13/something/76', 'Bar.cat will redirect to the correct route');
	});
});


test('Account route will redirect to the user route', function() {
	expect(3);

	visit('/profile/14/user/66').then(function() {
		var appController = App.__container__.lookup('controller:application');
		var appRouter = App.__container__.lookup('route:application');

		strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
		strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
		strictEqual(appRouter.router.location.path, '/user/66/something/14', 'Bar.cat will redirect to the correct route');
	});
});
