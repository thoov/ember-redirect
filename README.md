# Ember Redirect

EmberJS Redirect addon for Ember-CLI. This addon aims to be a simple and easy way to preform route based redirects with minimal effort. The goal is to support legacy links and link-tos which can "redirect" to a new route. You will be still be able to extend off of these "old" routes which should allow building new features much easier then having to start from scratch in a large project. Also looking at your router.js file should easily show you where certain routes will redirect to instead of hiding that inside of mixins as an example.

[![Build Status](https://travis-ci.org/thoov/ember-redirect.svg?branch=master)](https://travis-ci.org/thoov/ember-websockets)
[![Ember Observer Score](http://emberobserver.com/badges/ember-redirect.svg)](http://emberobserver.com/addons/ember-redirect)
[![npm version](https://badge.fury.io/js/ember-redirect.svg)](http://badge.fury.io/js/ember-redirect)
## Installation ##

```
ember install ember-redirect
```

## Usage ##

```js
const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  redirects: {
    'sample'        : 'something',
    'testing.index' : 'something',
    'testing.foo'   : 'bar',
    'bar.cat'       : 'testing.foo',
    'account'       : 'user',
    'profile'       : 'user'
  }
});

Router.map(function() {
  this.route('bar');
  this.route('sample'); // will redirect to something
  this.route('something');

  this.route('testing', function() { // will redirect to something
    this.route('foo'); // will redirect to bar

    this.route('bar', function() {
      this.route('cat'); // will redirect to testing.foo
    });
  });

  this.route('user', { path: 'user/:user_id/something/:something' });
  this.route('profile', { path: 'profile/:profile_id/user/:user_id' }); // will redirect to user
  this.route('account', { path: 'account/:account_id/other/:other_id' }); // will redirect to user
});
```

## Dynamic Routes ##

Dynamic routes are supported and follow two rules:

The first is that if you are redirecting from one route to another and they share a common
dynamic segment then those are preserved. As an example we have the following routes:

```js
redirects: {
  'profile' : 'user'
}

...

this.route('user', { path: 'user/:user_id/something/:something' });
this.route('profile', { path: 'profile/:profile_id/user/:user_id' });
```

Our profile url would be something like this: `/profile/1/user/13` and would redirect to
the user route of: `/user/13/something/1`. You can see in this example that both routes
share the same `:user_id` segment and those are mapped together.

The next rule is that once all shared dynamic segments are matched (or there are none) then
we simple fall back to doing a 1:1 match. As an example:

```js
redirects: {
  'account' : 'user'
}

...

this.route('user', { path: 'user/:user_id/something/:something' });
this.route('account', { path: 'account/:account_id/other/:other_id' });
```

Our account url would be something of this form: `/account/34/other/17` and would
redirect to the user route of: `/user/34/something/17`. As you can see there are no
shared dynamic segments so we just perform a 1:1 mapping where the first segment in account
maps to the first segment in user.

## Running tests ##

* `git clone git@github.com:thoov/ember-redirect.git`
* `cd ember-redirect`
* `npm i; bower i`
* `ember test`
  * or `ember s` then visit [localhost tests](http://localhost:4200/tests)
* Tests are also run on [TravisCI](https://travis-ci.org/thoov/ember-redirect)

## Feedback or Issues ##

If you have any feedback, encounter any bugs, or just have a question, please feel free to create a [github issue](https://github.com/thoov/ember-redirect/issues/new) or send me a tweet at [@thoov](https://twitter.com/thoov).
