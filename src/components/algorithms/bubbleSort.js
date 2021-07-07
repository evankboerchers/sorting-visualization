import { Animation } from '../Animation';
import { Color } from '../Color';

export function bubbleSort(array) {
  let animations = [];

  let swapped = false;

  let len = array.length;

  do {
    swapped = false;

    //loop through array
    for (let i = 0; i < len; i++) {
      animations.push(Animation(array.slice(), [Color('compare', [i, i + 1])]));

      //swap if left is larger
      if (array[i] > array[i + 1]) {
        animations.push(Animation(array.slice(), [Color('swap', [i, i + 1])]));

        let tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        swapped = true;

        animations.push(Animation(array.slice(), []));
      }
    }
  } while (swapped);

  return animations;
}
