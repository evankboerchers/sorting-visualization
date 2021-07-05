import { Animation } from '../Animation';
import { Color } from '../Color';

export function insertionSort(array) {
  let animations = [];

  let i, key, j;

  let len = array.length;

  for (i = 1; i < len; i++) {
    key = array[i];
    j = i - 1;

    animations.push(Animation(array.slice(), [Color('hold', [i, j])]));

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];

      animations.push(
        Animation(array.slice(), [Color('hold', [i]), Color('swap', [j + 1])])
      );

      j = j - 1;
    }

    array[j + 1] = key;

    animations.push(
      Animation(array.slice(), [Color('hold', [i]), Color('swap', [j + 1])])
    );
    animations.push(Animation(array.slice(), [Color('hold', [i, j + 1])]));
  }

  return animations;
}
