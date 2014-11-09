# Ember Redirect

EmberJS Redirect addon for Ember-CLI. This addon aims to be a simple and easy way to preform route based redirects with minimal effort. The goal is to support legacy links and link-tos which can "redirect" to a new route. You will be still be able to extend off of these "old" routes which should allow building new features/pages much easier then having to start from scratch in a large project. Also looking at your router.js file should very easily show you where certain routes will redirect to instead of hiding that inside of mixins as an example.

[![Build Status](https://travis-ci.org/thoov/ember-redirect.svg?branch=master)](https://travis-ci.org/thoov/ember-redirect)

## Installation ##

* `npm install --save-dev ember-redirect`

## Usage ##

```js
var Router = Ember.Router.extend({
  location: config.locationType,

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

    this.resource('testing', function() { // will redirect to something
        this.route('foo'); // will redirect to bar

        this.resource('bar', function() {
            this.route('cat'); // will redirect to testing.foo
        });
    });

    this.route('user', { path: 'user/:user_id/something/:something' });
    this.route('profile', { path: 'profile/:profile_id/user/:user_id' }); // will redirect to user
    this.route('account', { path: 'account/:account_id/other/:other_id' }); // will redirect to user
});
```

**Note**: In previous versions you used to be able to define redirects on the actual route/resource definitions like this:
`this.route('foo', { redirect: 'bar' })`. This has been removed and you will need to move over to the above usage.

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

## Generated Routes ##

If you have a route defined inside of your router map but do not create the route Ember behind the scene will generate a "basic" route
for you. This addon will instead generate the route and then apply its magic to the newly generated route. After it does
that, it will register the route onto the app.

## Running tests ##

* `git clone git@github.com:thoov/ember-redirect.git`
* `cd ember-redirect`
* `npm install`
* `ember t`
  * or `ember s` then visit [localhost tests](http://localhost:4200/tests)
* Tests are also run on [TravisCI](https://travis-ci.org/thoov/ember-redirect)

## Feedback or Issues ##

If you have any feedback, encounter any bugs, or just have a question, please feel free to create a [github issue](https://github.com/thoov/ember-redirect/issues/new) or send me a tweet at [@thoov](https://twitter.com/thoov).
