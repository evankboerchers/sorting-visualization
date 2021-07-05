import { Animation } from '../Animation';
import { Color } from '../Color';

export function quickSort(arr) {
  let animations = [];

  quickSortRec(arr, 0, arr.length - 1, animations);

  return animations;
}

function quickSortRec(arr, left, right, animations) {
  var index;

  if (arr.length > 1) {
    index = partition(arr, left, right, animations);
    if (left < index - 1) {
      quickSortRec(arr, left, index - 1, animations);
    }
    if (index < right) {
      quickSortRec(arr, index, right, animations);
    }
  }
}

function swap(arr, leftIndex, rightIndex) {
  var temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
}

function partition(arr, left, right, animations) {
  var pivotIndex = Math.floor((right + left) / 2),
    pivot = arr[pivotIndex];
  var i = left,
    j = right;

  animations.push(
    Animation(arr.slice(), [
      Color('hold', [pivotIndex]),
      Color('compare', [i, j]),
    ])
  );

  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
      animations.push(
        Animation(arr.slice(), [
          Color('hold', [pivotIndex]),
          Color('compare', [i, j]),
        ])
      );
    }
    while (arr[j] > pivot) {
      j--;
      animations.push(
        Animation(arr.slice(), [
          Color('hold', [pivotIndex]),
          Color('compare', [i, j]),
        ])
      );
    }
    if (i <= j) {
      swap(arr, i, j);
      animations.push(
        Animation(arr.slice(), [
          Color('hold', [pivotIndex]),
          Color('swap', [i, j]),
        ])
      );
      i++;
      j--;
      animations.push(
        Animation(arr.slice(), [
          Color('hold', [pivotIndex]),
          Color('compare', [i, j]),
        ])
      );
    }
  }
  return i;
}
