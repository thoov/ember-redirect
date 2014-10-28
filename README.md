# Ember Redirect

EmberJS Redirect addon for Ember-CLI. This addon aims to be a simple and easy way to preform route based redirects with minimal effort. The goal is to support legacy links and link-tos which can "redirect" to a new route. You will be still be able to extend off of these "old" routes which should allow building new features/pages much easier then having to start from scratch in a large project. Also looking at your router.js file should very easily show you where certain routes will redirect to instead of hiding that inside of mixins as an example.

**NOTE**: This is still a work in progress and is "Beta" quality.

[![Build Status](https://travis-ci.org/thoov/ember-redirect.svg?branch=master)](https://travis-ci.org/thoov/ember-redirect)

## Installation ##

* `npm install --save-dev ember-redirect`

## Usage ##

Simply place a redirect property within the options argument on either a route or resource such as this:

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
    this.route('foo');

    this.route('account', { path: 'account/:account_id/other/:other_id', redirect: 'user' });
    this.route('user', { path: 'user/:user_id/something/:something' });
    this.route('profile', { path: 'profile/:profile_id/user/:user_id', redirect: 'user' });
});
```

**Note** Your map function will be called twice during the app's lifetime so if you have any hacks or crazy logic within
there might be some conflicts.

## Dynamic Routes ##

Dynamic routes are supported and follow two rules:

The first is that if you are redirecting from one route to another and they share a common
dynamic segment then those are preserved. As an example we have the following routes:

```js
this.route('profile', { path: 'profile/:profile_id/user/:user_id', redirect: 'user' });
this.route('user', { path: 'user/:user_id/something/:something' });
```

Our profile url would be something like this: `/profile/1/user/13` and would redirect to
the user route of: `/user/13/something/1`. You can see in this example that both routes
share the same `:user_id` segment and those are mapped together.

The next rule is that once all shared dynamic segments are matched (or there are none) then
we simple fall back to doing a 1:1 match. As an example:

```js
this.route('account', { path: 'account/:account_id/other/:other_id', redirect: 'user' });
this.route('user', { path: 'user/:user_id/something/:something' });
```

Our account url would be something of this form: `/account/34/other/17` and would
redirect to the user route of: `/user/34/something/17`. As you can see there are no
shared dynamic segments so we just perform a 1:1 mapping where the first segment in account
maps to the first segment in user.

## Generated Routes ##

If you have a route defined inside of you router map but do not create the route Ember behind the scene will generate a "basic" route
for you. This addon will instead generate the route and then apply its magic to the newly generated route. After it does
that, it will register the route onto the app.
