export function bubbleSort(array) {
  let animations = [];

  let swapped = false;

  let len = array.length;

  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      animations.push({
        array: array.slice(),
        type: 'compare',
        compare: [i, i + 1],
      });

      if (array[i] > array[i + 1]) {
        animations.push({
          array: array.slice(),
          type: 'swap',
          swap: [i, i + 1],
        });

        let tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        swapped = true;

        animations.push({ array: array.slice(), type: 'swapped' });
      }
    }
  } while (swapped);

  return animations;
}
