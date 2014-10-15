import Ember from 'ember';

export default Ember.Route.extend({
  /**
  * Determine if the route which the user is requesting as been moved
  * to a new location
  *
  * @method beforeModel
  * @param {transition} The object representing the transition
  */
  beforeModel: function(transition) {
    var intentedUrl       = transition.intent.url,
        redirectsObject   = this.router.redirects,
        redirectRegexs    = Ember.keys(redirectsObject);

    redirectRegexs.forEach(function(regex) {
      // If the url the user is requesting matches a regex then we
      // will transition to the specified router name.
      if(intentedUrl.match(regex) !== null) {
        this.transitionTo(redirectsObject[regex]);
      }
    }.bind(this));
  }
});
