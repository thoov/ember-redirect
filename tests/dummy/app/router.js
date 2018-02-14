import config from './config/environment';
import EmberRouter from '@ember/routing/router';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  redirects: { // eslint-disable-line
    'sample'        : 'something',
    'testing.index' : 'something',
    'testing.foo'   : 'bar',
    'bar.cat'       : 'testing.foo',
    'bar.world'     : 'testing.hello',
    'account'       : 'user',
    'profile'       : 'user',
    'login'         : 'foo',
    'generated'     : 'foo',
    'external'      : 'https://github.com/thoov/ember-redirect'
  }
});

Router.map(function() {
  this.route('sample');
  this.route('something');
  this.route('dog');

  this.route('testing', { resetNamespace: true }, function() {
    this.route('foo');
    this.route('hello');

    this.route('bar', { resetNamespace: true }, function() {
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
  this.route('generated');
  this.route('external');
});

export default Router;
