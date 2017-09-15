import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Nested resources will redirect - Integration');

test('routes within resources can redirect to the correct location', function(assert) {
  assert.expect(6);

  visit('/testing/bar/cat').then(function() {
    assert.strictEqual(currentPath(), 'bar', 'Bar.cat route will not redirect and stay on the correct path');
    assert.strictEqual(currentRouteName(), 'bar', 'Bar.cat route will not redirect and stay on the correct route');
  });

  visit('/testing/foo').then(function() {
    assert.strictEqual(currentPath(), 'bar', 'Testing.foo route will redirect to the correct path');
    assert.strictEqual(currentRouteName(), 'bar', 'Testing.foo routewill redirect to the correct route');
  });

  visit('/testing/bar/world').then(function() {
    assert.strictEqual(currentPath(), 'testing.hello', 'Bar.world route will redirect to the correct path');
    assert.strictEqual(currentRouteName(), 'testing.hello', 'Bar.world routewill redirect to the correct route');
  });
});
