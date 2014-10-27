import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('Nested resources will redirect - Integration', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, App.destroy);
	}
});

test('Bar.cat route will redirect to the something route', function() {
	expect(2);

	visit('/testing/bar/cat').then(function() {
		var appController = App.__container__.lookup('controller:application');

		strictEqual(appController.get('currentPath'), 'bar', 'Bar.cat will redirect to the correct path');
		strictEqual(appController.get('currentRouteName'), 'bar', 'Bar.cat will redirect to the correct route');
	});
});


test('Testing.bar route will redirect to the something route', function() {
	expect(2);

	visit('/testing/foo').then(function() {
		var appController = App.__container__.lookup('controller:application');

		strictEqual(appController.get('currentPath'), 'bar', 'Bar.cat will redirect to the correct path');
		strictEqual(appController.get('currentRouteName'), 'bar', 'Bar.cat will redirect to the correct route');
	});
});
