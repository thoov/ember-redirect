export default function (originalArray, x, y) {
  let tempArray = originalArray[x];
  originalArray[x] = originalArray[y];
  originalArray[y] = tempArray;
  return originalArray;
}
