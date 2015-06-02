import { module, test } from 'qunit';
import arraySwap from 'ember-redirect/utils/array-swap';

module('Unit - Utils - Array Swap');

test('that the array swap utility works as expected', function (assert) {
  var simpleArray = [1,2,3,4,5];
  var complexArray = [{foo: 'bar'}, 1, 'This is a sample string', [1,2,3]];

  assert.expect(6);

  assert.deepEqual(arraySwap(simpleArray, 0, 1), [2,1,3,4,5]);
  assert.deepEqual(arraySwap(simpleArray, 0, 1), [1,2,3,4,5]);
  assert.deepEqual(arraySwap(simpleArray, 0, simpleArray.length - 1), [5,2,3,4,1]);

  assert.deepEqual(arraySwap(complexArray, 0, 1),  [1, {foo: 'bar'}, 'This is a sample string', [1,2,3]]);
  assert.deepEqual(arraySwap(complexArray, 0, 1),  [{foo: 'bar'}, 1, 'This is a sample string', [1,2,3]]);
  assert.deepEqual(arraySwap(complexArray, 0, complexArray.length - 1),  [[1,2,3], 1, 'This is a sample string', {foo: 'bar'}]);
});
