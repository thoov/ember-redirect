import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Dynamic segments will redirect - Integration');

test('Account route will redirect to the user route', function(assert) {
  assert.expect(2);

  visit('/account/13/other/76').then(function() {
    assert.strictEqual(currentPath(), 'user', 'Account will redirect to the correct user path');
    assert.strictEqual(currentRouteName(), 'user', 'Account will redirect to the correct user route');
  });
});


test('Account route will redirect to the user route', function(assert) {
  assert.expect(2);

  visit('/profile/14/user/66').then(function() {
    assert.strictEqual(currentPath(), 'user', 'Account will redirect to the correct user path');
    assert.strictEqual(currentRouteName(), 'user', 'Account will redirect to the correct user route');
  });
});
