import { Animation } from '../Animation';
import { Color } from '../Color';

export function selectionSort(arr) {
  let animations = [];

  var i, j, min_idx;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < arr.length - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min_idx]) min_idx = j;

      animations.push(Animation(arr.slice(), [Color('compare', [i, j])]));
    }

    // Swap the found minimum element with the first element
    swap(arr, min_idx, i, animations);
  }

  return animations;
}

function swap(arr, i, j, animations) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  animations.push(Animation(arr.slice(), [Color('swap', [i, j])]));
}
