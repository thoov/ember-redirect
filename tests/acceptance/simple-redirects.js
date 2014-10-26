import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('Simple redirect integration test', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, App.destroy);
	}
});

test('Sample route will redirect to the something route', function() {
	expect(2);

	visit('/sample').then(function() {
		var appController = App.__container__.lookup('controller:application');

		strictEqual(appController.get('currentPath'), 'something', 'Sample will redirect to the correct path');
		strictEqual(appController.get('currentRouteName'), 'something', 'Sample will redirect to the correct route');
	});
});
