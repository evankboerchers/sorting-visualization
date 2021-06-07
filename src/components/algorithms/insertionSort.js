export function insertionSort(array) {
  let animations = [];

  let i, key, j;

  let len = array.length;

  for (i = 1; i < len; i++) {
    key = array[i];
    j = i - 1;

    animations.push({
      array: array.slice(),
      colors: [{ type: 'compare', indices: [i, j] }],
    });

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];

      animations.push({
        array: array.slice(),
        colors: [
          { type: 'complete', indices: [i] },
          { type: 'swap', indices: [j + 1] },
        ],
      });

      j = j - 1;
    }

    array[j + 1] = key;

    animations.push({
      array: array.slice(),
      colors: [
        { type: 'complete', indices: [i] },
        { type: 'swap', indices: [j + 1] },
      ],
    });

    animations.push({
      array: array.slice(),
      colors: [{ type: 'complete', indices: [i, j + 1] }],
    });
  }

  return animations;
}
