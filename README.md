# Ember Redirect

Ember redirect is an ember addon which allows you to preform regex based redirects within the router.
This is a perfect solution to "keeping" old links alive while redirecting the user to the new route.

## Installation ##

* `npm install --save-dev ember-redirect`

## Usage ##

Add the redirect to your `router.js`

```js
import Ember from 'ember';
import config from './config/environment';
import redirectRouter from 'ember-redirect/router';

var Router = Ember.Router.extend({
  location: config.locationType,
  // This is a basic hash object which
  // its keys are regexs and its value are route names.
  // More on this structure below.
  redirects: {
    'foo/bar': 'testing',
    'old/\d+/something'
  }
});

Router.map(function() {

  // Here is the list of all of your active routes and resources
  this.route('testing');

  redirectRouter(this); // This should be at the bottom of the map function
});

export default Router;
```

## Redirects Object ##

```js
var Router = Ember.Router.extend({
  location: config.locationType,
  // This is a basic hash object which
  // its keys are regexs and its value are route names.
  // More on this structure below.
  redirects: {
    'foo/bar': 'testing',
    'old/\d+/something'
  }
});
```

The redirects object holds a hash map of regexs which will map to 
