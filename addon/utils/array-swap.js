export default function (array, x, y) {
	var b = array[x];
	array[x] = array[y];
	array[y] = b;
	return array;
}
