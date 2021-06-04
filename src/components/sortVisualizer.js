import { buildQueries } from '@testing-library/dom';
import React from 'react';
import './sortVisualizer.css';
import BubbleSort from './algorithms/bubbleSort';

function SortVisualizer() {
  const ARRAY_RANGE = [5, 500];

  const BAR_SCALE = 1.5;

  const ANIMATION_SPEED = 10;

  const [arraySize, setArraySize] = React.useState(100);

  const [sortMethod, setSortMethod] = React.useState('bubble sort');

  const [numberArray, setNumberArray] = React.useState([0]);

  const [comparisonHash, setComparisonHash] = React.useState({ 1: true });

  React.useEffect(resetArray, []);

  function resetArray() {
    let array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(createRandomInt());
    }
    setNumberArray(array);
  }

  const createRandomInt = () =>
    Math.floor(Math.random() * ARRAY_RANGE[1]) + ARRAY_RANGE[0];

  const createArrayBar = (value, index) => {
    return (
      <div
        class="array-bar"
        style={{
          height: getBarHeight(value),
          backgroundColor: getBarColor(index),
          width: `calc(${getBarWidth()}% - 2px)`,
        }}
        key={index}
      ></div>
    );
  };

  const getBarHeight = (value) => value * BAR_SCALE;

  const getBarWidth = () => 100 / arraySize;

  const getBarColor = (index) => {
    console.log(typeof index);
    if (index in comparisonHash) {
      return 'red';
    } else {
      return 'purple';
    }
  };
  function sortTest() {
    for (let i = 0; i < arraySize; i++) {
      doTimeout(i);
    }
  }

  function doTimeout(i) {
    setTimeout(function cb() {
      animate(i, numberArray);
    }, i * ANIMATION_SPEED);
  }

  function animate(i, array) {
    console.log(typeof i);
    setComparisonHash({ i: true });
  }

  return (
    <div className="page-container">
      <div className="visualizer-container">
        <div className="bar-container">
          {numberArray.map((value, index) => createArrayBar(value, index))}
        </div>
        <div className="control-panel">
          <select className="control-item">
            <option>Bubble Sort</option>
            <option>Quick Sort</option>
          </select>
          <button className="control-item" onClick={() => sortTest()}>
            Sort
          </button>
          <button className="control-item" onClick={() => resetArray()}>
            New Array
          </button>
        </div>
      </div>
    </div>
  );
}

export default SortVisualizer;
