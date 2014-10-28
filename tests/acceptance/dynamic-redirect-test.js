import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App, container, lookupFunc;

module('Dynamic segments will redirect - Integration', {
	setup: function() {
		App = startApp();
		container = App.__container__;
		lookupFunc = container.lookup;
	},
	teardown: function() {
		Ember.run(App, App.destroy);
	}
});

test('Account route will redirect to the user route', function() {
	expect(3);

	visit('/account/13/other/76').then(function() {
		var appController = lookupFunc.call(container, 'controller:application'),
			appRoute = lookupFunc.call(container, 'route:application'),
			locationPath = appRoute.router.location.path;

		strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
		strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
		strictEqual(locationPath, '/user/13/something/76', 'Bar.cat will redirect to the correct route');
	});
});


test('Account route will redirect to the user route', function() {
	expect(3);

	visit('/profile/14/user/66').then(function() {
		var appController = lookupFunc.call(container, 'controller:application'),
			appRoute = lookupFunc.call(container, 'route:application'),
			locationPath = appRoute.router.location.path;

		strictEqual(appController.get('currentPath'), 'user', 'Account will redirect to the correct user path');
		strictEqual(appController.get('currentRouteName'), 'user', 'Account will redirect to the correct user route');
		strictEqual(locationPath, '/user/66/something/14', 'Bar.cat will redirect to the correct route');
	});
});
