import React from 'react';
import './sortVisualizer.css';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { quickSort } from './algorithms/quickSort';

const ARRAY_RANGE = [5, 500];

const BAR_SCALE = 1.5;

const REG_COLOR = 'Purple';

const COMPARE_COLOR = 'red';

const SWAP_COLOR = 'green';

const COMP_COLOR = 'grey';

const HOLD_COLOR = 'teal';

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
    setTimeout(function an() {
      reColorBars(bars);
      updateArray(animation.array);

      if ('colors' in animation) {
        colorBars(bars, animation);
      }
      if (complete) reColorBars(bars, true);
    }, i * animationSpeed);
  }

  function colorBars(bars, animation) {
    for (let color of animation.colors) {
      for (let index of color.indices) {
        try {
          bars[index].style.backgroundColor = getColor(color.type);
        } catch {}
      }
    }
    // switch (color.type) {
    //   case 'compare':
    //     for (let index of color.indices) {
    //       try {
    //         bars[index].style.backgroundColor = COMPARE_COLOR;
    //       } catch {
    //         console.log('error coloring bars in step');
    //       }
    //     }
    //     break;
    //   case 'swap':
    //     for (let index of color.indices) {
    //       try {
    //         bars[index].style.backgroundColor = SWAP_COLOR;
    //       } catch {
    //         console.log('error coloring bars in step');
    //       }
    //     }
    //     break;
    //   case 'complete':
    //     for (let index of color.indices) {
    //       try {
    //         bars[index].style.backgroundColor = COMP_COLOR;
    //       } catch {
    //         console.log('error coloring bars in step');
    //       }
    //     }
    //     break;
    // }
  }

  function getColor(type) {
    switch (type) {
      case 'compare':
        return COMPARE_COLOR;
      case 'swap':
        return SWAP_COLOR;
      case 'complete':
        return COMP_COLOR;
      case 'hold':
        return HOLD_COLOR;
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

  return (
    <div className="visualizer-container">
      <div className="wip"> WIP: More algorithms to come! </div>
      <div className="bar-container">
        {numberArray.map((value, index) => createArrayBar(value, index))}
      </div>
      <div className="control-panel">
        <div className="control-wrap">
          <select id="method" className="control-item">
            <option className="selection" value="bubble">
              Bubble Sort
            </option>
            <option className="selection" value="insertion">
              Insertion Sort
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
