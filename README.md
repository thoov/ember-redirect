# Ember Redirect

Ember redirect is an ember addon which allows you to preform regex based redirects within the router.
This is a perfect solution to "keeping" old links alive while redirecting the user to the new route.

## Installation ##

* `npm install --save-dev ember-redirect`

## Usage ##

```js
Router.map(function() {
  this.route('sample', { redirect: 'something' });
  this.route('something');

  this.resource('testing', {path: 'testing'}, function() {
      this.route('foo', { redirect: 'bar' });
  });

  this.route('bar');
});
```
