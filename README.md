# Ember Redirect

EmberJS Redirect addon for Ember-CLI (Currently in Alpha). This addon aims to be a simple and easy way to preform route based redirects with minimal effort. The goal is to support legacy links and link-tos which can "redirect" to a new route.

**NOTE**: This is still a work in progress and is "Alpha" quality. Please note that property
names and methods may change.

## Installation ##

* `npm install --save-dev ember-redirect`

## Usage ##

Simply place a redirect property within the options argument on either a route or resource such as this:

```js
Router.map(function() {
  this.route('sample', { path: 'samplepath', redirect: 'something' });
  this.route('something');

  this.resource('testing', { redirect: 'something' }, function() {
      this.route('foo', { redirect: 'bar' });

      this.resource('bar', function() {
          this.route('cat', { redirect: 'testing.foo' });
      });
  });

  this.route('bar');
});
```

**Note** Your map function will be called twice during the app's lifetime so if you have any hacks or crazy logic within
there might be some conflicts.
