import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

    this.route('sample', { redirect: 'something' });
    this.route('something');

    this.resource('testing', {redirect: 'something'}, function() {
        this.route('foo', { redirect: 'bar' });
        this.route('hello');

        this.resource('bar', function() {
            this.route('cat', { redirect: 'testing.foo' });
            this.route('world', { redirect: 'testing.hello' });
        });
    });

    this.route('bar');
    this.route('foo');

    this.route('account', { path: 'account/:account_id/other/:other_id', redirect: 'user' });
    this.route('user', { path: 'user/:user_id/something/:something' });
    this.route('profile', { path: 'profile/:profile_id/user/:user_id', redirect: 'user' });

    this.route('login', { redirect: 'foo' });
});

export default Router;
