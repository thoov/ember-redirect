export default function (originalArray, x, y) {
	var tempArray = originalArray[x];
	originalArray[x] = originalArray[y];
	originalArray[y] = tempArray;
	return originalArray;
}
