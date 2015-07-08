import Ember from 'ember';
import arraySwap from './utils/array-swap';

const filter  = Ember.EnumerableUtils.filter;
const map     = Ember.EnumerableUtils.map;
const forEach = Ember.EnumerableUtils.forEach;

export default function(routeName, options, instance) {
  var routeContainerKey = `route:${routeName}`;
  var routeObject       = instance.container.lookup(routeContainerKey);

  if (!routeObject) {
    routeObject = Ember.Route.extend({});
    instance.registry.register(routeContainerKey, routeObject, { singleton: false });
  }

  Ember.assert(`Could not find a route named: ${routeName}`, routeObject);

  routeObject.reopen({
    beforeModel: function(transition) {
      var newDynObject       = {};
      var thisRouteName      = this.routeName;
      var routeNames         = this.router.router.recognizer.names;
      var dynSegsOfNextRoute = map(filter(routeNames[options.redirect].segments, item => item.name), item => item.name);
      var dynSegsOfThisRoute = map(filter(routeNames[thisRouteName].segments, item => item.name), item => item.name);

      // Make sure we only try to make a redirect at the most nested
      // route and not a parent resource.
      if(this.routeName !== transition.targetName) {
        return false;
      }

      // Make sure that the lengths are the same else we are trying to transition to a route that needs more
      // segments then we can supply.
      if(dynSegsOfNextRoute.length <= dynSegsOfThisRoute.length) {

        forEach(dynSegsOfNextRoute, function(item, index) {
          // This means that we have the same dynamic segment on both this and the next route so we will pair them together.
          if(dynSegsOfThisRoute.indexOf(dynSegsOfNextRoute[index]) !== -1) {
            newDynObject[dynSegsOfNextRoute[index]] = transition.params[thisRouteName][dynSegsOfNextRoute[index]];
            dynSegsOfThisRoute = arraySwap(dynSegsOfThisRoute, index, dynSegsOfThisRoute.indexOf(dynSegsOfNextRoute[index]));
          }
          else {
            newDynObject[dynSegsOfNextRoute[index]] = transition.params[thisRouteName][dynSegsOfThisRoute[index]];
          }
        });

        this.replaceWith(transition.router.recognizer.generate(options.redirect, newDynObject));
      }

      this._super.apply(this, arguments);
    }
  });

  return routeObject;
}
