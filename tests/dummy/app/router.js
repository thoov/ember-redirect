import Ember from 'ember';
import config from './config/environment';
import redirect from 'ember-redirect/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  debugger
  redirect(this, 'testing', {path: 'testing'}, 'index');
});

export default Router;
