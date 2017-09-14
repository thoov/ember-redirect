import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Redirect routes are extensible');

test('Dog route extends from sample and does not redirect', function(assert) {
  assert.expect(3);

  visit('/dog').then(function() {
    assert.strictEqual(currentURL(), 'dog', 'Dog route does not redirect and stays on dog');
    assert.strictEqual(currentRouteName(), 'dog', 'Dog route does not redirect and stays on dog');
  });
});
