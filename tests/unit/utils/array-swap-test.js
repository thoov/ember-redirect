import arraySwap from 'ember-redirect/utils/array-swap';

module('Unit - Utils - Array Swap');

test('that the array swap utility works as expected', function () {
    var simpleArray = [1,2,3,4,5],
        complexArray = [{foo: 'bar'}, 1, 'This is a sample string', [1,2,3]];

    deepEqual(arraySwap(simpleArray, 0, 1), [2,1,3,4,5]);
    deepEqual(arraySwap(simpleArray, 0, 1), [1,2,3,4,5]);
    deepEqual(arraySwap(simpleArray, 0, simpleArray.length - 1), [5,2,3,4,1]);

    deepEqual(arraySwap(complexArray, 0, 1),  [1, {foo: 'bar'}, 'This is a sample string', [1,2,3]]);
    deepEqual(arraySwap(complexArray, 0, 1),  [{foo: 'bar'}, 1, 'This is a sample string', [1,2,3]]);
    deepEqual(arraySwap(complexArray, 0, complexArray.length - 1),  [[1,2,3], 1, 'This is a sample string', {foo: 'bar'}]);
});
