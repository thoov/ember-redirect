import Ember from 'ember';
import arraySwap from 'ember-redirect/utils/array-swap';
import { lookup, register } from 'ember-redirect/utils/container';

/**
 * - `type` and `value` are in Ember > v2.8
 * - `name` is in Ember === 2.8
 */
function getDynamicSegments(segments) {
  return segments
    .filter(item => item.type === 1 || !!item.name)
    .map(item => item.value || item.name);
}

export default function(routeName, options, instance) {
  let routeContainerKey = `route:${routeName}`;
  let routeObject       = lookup(instance, routeContainerKey);

  if (!routeObject) {
    routeObject = Ember.Route.extend({});
    register(instance, routeContainerKey, routeObject, { singleton: false });
  }

  routeObject.reopen({
    beforeModel(transition) {
      let newDynObject       = {};
      let thisRouteName      = this.routeName;
      let routeNames         = this.router.router.recognizer.names;
      let dynSegsOfNextRoute = getDynamicSegments(routeNames[options.redirect].segments);
      let dynSegsOfThisRoute = getDynamicSegments(routeNames[thisRouteName].segments);

      // Make sure we only try to make a redirect at the most nested
      // route and not a parent resource.
      if(this.routeName !== transition.targetName) {
        return false;
      }

      // Make sure that the lengths are the same else we are trying to transition to a route that needs more
      // segments then we can supply.
      if(dynSegsOfNextRoute.length <= dynSegsOfThisRoute.length) {

        dynSegsOfNextRoute.forEach(function(item, index) {
          // This means that we have the same dynamic segment on both this and the next route so we will pair them together.
          if(dynSegsOfThisRoute.indexOf(dynSegsOfNextRoute[index]) !== -1) {
            newDynObject[dynSegsOfNextRoute[index]] = transition.params[thisRouteName][dynSegsOfNextRoute[index]];
            dynSegsOfThisRoute = arraySwap(dynSegsOfThisRoute, index, dynSegsOfThisRoute.indexOf(dynSegsOfNextRoute[index]));
          }
          else {
            newDynObject[dynSegsOfNextRoute[index]] = transition.params[thisRouteName][dynSegsOfThisRoute[index]];
          }
        });

        // Pass along query params.
        newDynObject['queryParams'] = transition.queryParams;

        this.replaceWith(transition.router.recognizer.generate(options.redirect, newDynObject));
      }

      return this._super(...arguments);
    }
  });

  return routeObject;
}
