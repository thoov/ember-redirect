import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'showDetails'],
  page: null,
  showDetails: null
});
