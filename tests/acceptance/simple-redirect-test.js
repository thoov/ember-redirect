import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Simple routes will redirect - Integration');

test('the base case where not specifing a redirect will not redirect', function(assert) {
  assert.expect(4);

  visit('/something').then(function() {
    assert.strictEqual(currentPath(), 'something', 'Something route will not redirect and stay on the correct path');
    assert.strictEqual(currentRouteName(), 'something', 'Something route will not redirect and stay on the correct route');
  });

  visit('/testing/bar').then(function() {
    assert.strictEqual(currentPath(), 'testing.bar.index', 'Something route will not redirect and stay on the correct path');
    assert.strictEqual(currentRouteName(), 'bar.index', 'Something route will not redirect and stay on the correct route');
  });
});

test('basic route to route redirects are performed correctly', function(assert) {
  assert.expect(4);

  visit('/sample').then(function() {
    assert.strictEqual(currentPath(), 'something', 'Sample route will redirect to the correct path');
    assert.strictEqual(currentRouteName(), 'something', 'Sample route will redirect to the correct route');
  });

  visit('/login').then(function() {
    assert.strictEqual(currentPath(), 'foo', 'Login route will redirect to the correct path');
    assert.strictEqual(currentRouteName(), 'foo', 'Login route will redirect to the correct route');
  });
});


test('basic resource to route redirects are performed correctly', function(assert) {
  assert.expect(2);

  visit('/testing').then(function() {
    assert.strictEqual(currentPath(), 'something', 'Testing resource will redirect to the correct path');
    assert.strictEqual(currentRouteName(), 'something', 'Testing resource will redirect to the correct route');
  });
});
