import { Animation } from '../Animation';
import { Color } from '../Color';

export function mergeSort(arr) {
  let animations = [];

  mergeSortRec(arr, 0, arr.length - 1, animations);

  return animations;
}

function mergeSortRec(arr, left, right, animations) {
  if (left >= right) {
    return;
  }
  var mid = left + parseInt((right - left) / 2);
  mergeSortRec(arr, left, mid, animations);
  mergeSortRec(arr, mid + 1, right, animations);
  merge(arr, left, mid, right, animations);
}

function merge(arr, left, mid, right, animations) {
  var n1 = mid - left + 1;
  var n2 = right - mid;

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) L[i] = arr[left + i];
  for (var j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var ii = 0;

  // Initial index of second subarray
  var jj = 0;

  // Initial index of merged subarray
  var k = left;

  while (ii < n1 && jj < n2) {
    if (L[ii] <= R[jj]) {
      arr[k] = L[ii];
      animations.push(
        Animation(arr.slice(), [
          Color('compare', range(left, right)),
          Color('swap', [k]),
        ])
      );
      ii++;
    } else {
      arr[k] = R[jj];
      animations.push(
        Animation(arr.slice(), [
          Color('compare', range(left, right)),
          Color('swap', [k]),
        ])
      );
      jj++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (ii < n1) {
    arr[k] = L[ii];
    animations.push(
      Animation(arr.slice(), [
        Color('compare', range(left, right)),
        Color('swap', [k]),
      ])
    );
    ii++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (jj < n2) {
    arr[k] = R[jj];
    animations.push(
      Animation(arr.slice(), [
        Color('compare', range(left, right)),
        Color('swap', [k]),
      ])
    );
    jj++;
    k++;
  }
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
