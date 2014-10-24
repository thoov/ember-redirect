import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('sample', { redirect: 'something' });
  this.route('something');

  this.resource('testing', {path: 'testing'}, function() {
      this.route('foo', { redirect: 'bar' });
  });

  this.route('bar');

});

export default Router;
