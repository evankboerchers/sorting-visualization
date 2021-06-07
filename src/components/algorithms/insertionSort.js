export function insertionSort(array) {
  let animations = [];

  let i, key, j;

  let len = array.length;

  for (i = 1; i < len; i++) {
    key = array[i];
    j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push({
        array: array.slice(),
        type: 'compare',
        compare: [i, j],
      });
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
}
