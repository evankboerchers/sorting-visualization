import React from 'react';
import './sortVisualizer.css';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import { selectionSort } from './algorithms/selectionSort';

const ARRAY_RANGE = [5, 500];

const BAR_SCALE = 1.5;

const REG_COLOR = '#36279c';

const COMPARE_COLOR = '#9c222c';

const SWAP_COLOR = '#269950';

const HOLD_COLOR = '#b86827';

const ARRAY_SIZE_DEFAULT = 15;

const ANIMATION_SPEED_DEFAULT = 50;

const METHODS = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'merge', label: 'Merge Sort' },
  { value: 'selection', label: 'Selection Sort' },
];

function SortVisualizer() {
  const [animationSpeed, setAnimationSpeed] = React.useState(
    ANIMATION_SPEED_DEFAULT
  );

  const [arraySize, setArraySize] = React.useState(ARRAY_SIZE_DEFAULT);

  const [numberArray, setNumberArray] = React.useState([0]);

  const [method, setMethod] = React.useState('bubble');

  var timeouts = [];

  React.useEffect(resetArray, [arraySize]);

  function resetArray() {
    let array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(createRandomInt());
    }
    updateArray(array);
  }

  function updateArray(array) {
    console.log('array updated: ');
    setNumberArray(array);
  }

  function changeArraySize(value) {
    console.log('array size changed to: ' + value);
    setArraySize(value);
  }

  function changeAnimiationSpeed(value) {
    console.log('animation speed changed ' + value);
    setAnimationSpeed(value);
  }

  const createRandomInt = () =>
    Math.floor(Math.random() * ARRAY_RANGE[1]) + ARRAY_RANGE[0];

  const getBarHeight = (value) => value * BAR_SCALE;

  const getBarWidth = () => 100 / arraySize;

  function handleSortClick() {
    const method = document.getElementById('method').value;
    let array = numberArray.slice();

    console.log(`performing ${method} sort`);

    switch (method) {
      case 'insertion':
        animate(insertionSort(array));
        break;
      case 'bubble':
        animate(bubbleSort(array));
        break;
      case 'quick':
        animate(quickSort(array));
        break;
      case 'merge':
        animate(mergeSort(array));
        break;
      case 'selection':
        animate(selectionSort(array));
        break;
      default:
    }
  }

  function animate(animations) {
    const bars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      if (i !== animations.length - 1) {
        animationStep(animations[i], i, bars, false);
      } else {
        animationStep(animations[i], i, bars, true);
      }
    }
  }

  function animationStep(animation, i, bars, complete) {
    timeouts.push(
      setTimeout(function an() {
        reColorBars(bars);
        updateArray(animation.array);

        if ('colors' in animation) {
          colorBars(bars, animation);
        }
        if (complete) reColorBars(bars, true);
      }, i * animationSpeed)
    );
  }

  function colorBars(bars, animation) {
    for (let color of animation.colors) {
      for (let index of color.indices) {
        try {
          bars[index].style.backgroundColor = getColor(color.type);
        } catch {}
      }
    }
  }

  function getColor(type) {
    switch (type) {
      case 'compare':
        return COMPARE_COLOR;
      case 'swap':
        return SWAP_COLOR;
      case 'hold':
        return HOLD_COLOR;
      default:
        return REG_COLOR;
    }
  }

  function reColorBars(bars) {
    for (let bar of bars) {
      bar.style.backgroundColor = REG_COLOR;
    }
  }

  const createArrayBar = (value, index) => {
    return (
      <div
        className="array-bar"
        style={{
          height: getBarHeight(value),
          width: `calc(${getBarWidth()}% - 2px)`,
          backgroundColor: REG_COLOR,
        }}
        key={index}
      ></div>
    );
  };

  function SortOptions() {
    return (
      <select
        id="method"
        name="selectedMethod"
        className="control-item"
        onChange={(e) => {
          setMethod(e.target.value);
        }}
      >
        {METHODS.map((m) =>
          m.value === method ? (
            <option className="selection" value={m.value} selected>
              {m.label}
            </option>
          ) : (
            <option className="selection" value={m.value}>
              {m.label}
            </option>
          )
        )}
      </select>
    );
  }

  return (
    <div className="visualizer-container">
      <div className="bar-container">
        {numberArray.map((value, index) => createArrayBar(value, index))}
      </div>
      <div className="control-panel">
        <div className="control-wrap">
          <SortOptions />
          <button
            className="control-color control-button control-item"
            onClick={() => handleSortClick()}
          >
            Sort
          </button>
          <button
            className="control-color control-button control-item"
            onClick={() => resetArray()}
          >
            New Array
          </button>
          <div className="slider-container control-item">
            <label className="slider-label">Array Size </label>
            <input
              onClick={(e) => changeArraySize(e.target.value)}
              type="range"
              id="array-size"
              name="array size"
              min="10"
              max="100"
              defaultValue={ARRAY_SIZE_DEFAULT}
            ></input>
          </div>
          <div className="slider-container control-item">
            <label className="slider-label"> Animation Time </label>
            <input
              onClick={(e) => changeAnimiationSpeed(e.target.value)}
              className="control-color"
              type="range"
              id="speed"
              name="speed"
              min="1"
              max="600"
              defaultValue={ANIMATION_SPEED_DEFAULT}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortVisualizer;
