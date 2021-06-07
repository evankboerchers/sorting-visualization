import React from 'react';
import './sortVisualizer.css';
import { bubbleSort } from './algorithms/bubbleSort';

const ARRAY_RANGE = [5, 500];

const BAR_SCALE = 1.5;

const REG_COLOR = 'Purple';

const COMPARE_COLOR = 'red';

const SWAP_COLOR = 'green';

const COMP_COLOR = 'grey';

const ARRAY_SIZE_DEFAULT = 15;

const ANIMATION_SPEED_DEFAULT = 50;

function SortVisualizer() {
  const [animationSpeed, setAnimationSpeed] = React.useState(
    ANIMATION_SPEED_DEFAULT
  );

  const [arraySize, setArraySize] = React.useState(ARRAY_SIZE_DEFAULT);

  const [numberArray, setNumberArray] = React.useState([0]);

  const [sorted, setSorted] = React.useState(false);

  React.useEffect(resetArray, []);

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
    const method = document.getElementById('method');
    let array = numberArray.slice();

    switch (method) {
      default:
        animate(bubbleSort(array));
    }
  }

  function animate(animations) {
    const bars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      if (i != animations.length - 1) {
        animationStep(animations[i], i, bars, false);
      } else {
        animationStep(animations[i], i, bars, true);
      }
    }
  }

  function animationStep(animation, i, bars, complete) {
    setTimeout(function cb() {
      reColorBars(bars);
      updateArray(animation.array);
      try {
        bars[animation.compare[0]].style.backgroundColor = COMPARE_COLOR;
        bars[animation.compare[1]].style.backgroundColor = COMPARE_COLOR;
      } catch {}
      try {
        bars[animation.swap[0]].style.backgroundColor = SWAP_COLOR;
        bars[animation.swap[1]].style.backgroundColor = SWAP_COLOR;
      } catch {}
      if (complete) reColorBars(bars, true);
    }, i * animationSpeed);
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

  return (
    <div className="visualizer-container">
      <div className="bar-container">
        {numberArray.map((value, index) => createArrayBar(value, index))}
      </div>
      <div className="control-panel">
        <div className="control-wrap">
          <select id="method" className="control-item">
            <option className="selection" value="bubble">
              Bubble Sort
            </option>
            <option className="selection" value="quick">
              Quick Sort
            </option>
          </select>
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
              max="70"
              defaultValue={ANIMATION_SPEED_DEFAULT}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortVisualizer;
