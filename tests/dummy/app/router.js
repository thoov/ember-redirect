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

      this.resource('bar', function() {
          this.route('cat', { redirect: 'testing.foo' });
      });
  });

  this.route('bar');

});

export default Router;
