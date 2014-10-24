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

  this.resource('testing', {redirect: 'something'}, function() {
      this.route('foo', { redirect: 'bar' });

      this.resource('bar', function() {
          this.route('cat', { redirect: 'testing.foo' });
      });
  });

  this.route('bar');
});
```
