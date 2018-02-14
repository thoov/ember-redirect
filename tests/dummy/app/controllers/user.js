import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['page', 'showDetails'],
  page: null,
  showDetails: null
});
