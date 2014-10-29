import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  redirects: {
    'sample'        : 'something',
    'testing.index' : 'something',
    'testing.foo'   : 'bar',
    'bar.cat'       : 'testing.foo',
    'bar.world'     : 'testing.hello',
    'account'       : 'user',
    'profile'       : 'user',
    'login'         : 'foo'
  }
});

Router.map(function() {

    this.route('sample');
    this.route('something');

    this.resource('testing', function() {
        this.route('foo');
        this.route('hello');

        this.resource('bar', function() {
            this.route('cat');
            this.route('world');
        });
    });

    this.route('bar');
    this.route('foo');

    this.route('account', { path: 'account/:account_id/other/:other_id' });
    this.route('user', { path: 'user/:user_id/something/:something' });
    this.route('profile', { path: 'profile/:profile_id/user/:user_id' });

    this.route('login');
});

export default Router;
