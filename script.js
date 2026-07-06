/*
  DSA Visualizer - Main Script
  Author: Jisan Halder
  Handles all sorting animations using async/await delays.
  Merge sort was the toughest to get right lol.

  Algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
*/

// ===== STATE =====
let array = [];
let isSorting = false;
let stopRequested = false;
let comparisons = 0;
let swaps = 0;

// Speed delay in ms (lower = faster)
// index 1 to 5 → very slow to very fast
const speedMap = {
  1: 300,
  2: 100,
  3: 40,
  4: 10,
  5: 2
};

const speedLabels = {
  1: 'Very Slow',
  2: 'Slow',
  3: 'Medium',
  4: 'Fast',
  5: 'Very Fast'
};

// Algorithm info - for the info card
const algoInfo = {
  bubble: {
    name: '🫧 Bubble Sort',
    desc: 'Repeatedly compares adjacent elements and swaps them if they are in wrong order. Very simple to understand but slow for large inputs.',
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    complexity: 'O(n²)'
  },
  selection: {
    name: '🔍 Selection Sort',
    desc: 'Finds the minimum element from the unsorted part and puts it at the beginning. Makes fewer swaps than bubble sort.',
    best: 'O(n²)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    complexity: 'O(n²)'
  },
  insertion: {
    name: '🃏 Insertion Sort',
    desc: 'Builds the sorted array one element at a time by inserting each element into its correct position. Great for nearly sorted arrays!',
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    complexity: 'O(n²)'
  },
  merge: {
    name: '🔀 Merge Sort',
    desc: 'Divides the array in half, sorts each half, then merges them. Uses the divide and conquer approach. Guaranteed O(n log n)!',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    complexity: 'O(n log n)'
  },
  quick: {
    name: '⚡ Quick Sort',
    desc: 'Picks a pivot element and partitions the array around it. Very fast in practice. The built-in sort in most languages uses this internally!',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    complexity: 'O(n log n)'
  }
};


// ===== DOM REFERENCES =====
const visualizer   = document.getElementById('visualizer');
const generateBtn  = document.getElementById('generateBtn');
const startBtn     = document.getElementById('startBtn');
const stopBtn      = document.getElementById('stopBtn');
const algoSelect   = document.getElementById('algorithm');
const arraySizeSlider = document.getElementById('arraySize');
const speedSlider  = document.getElementById('speed');
const sizeVal      = document.getElementById('sizeVal');
const speedVal     = document.getElementById('speedVal');
const compEl       = document.getElementById('comparisons');
const swapsEl      = document.getElementById('swaps');
const statusEl     = document.getElementById('status');
const complexityEl = document.getElementById('complexity');

// Info card
const algoName   = document.getElementById('algoName');
const algoDesc   = document.getElementById('algoDesc');
const bestEl     = document.getElementById('best');
const avgEl      = document.getElementById('avg');
const worstEl    = document.getElementById('worst');
const spaceEl    = document.getElementById('space');


// ===== INIT =====
window.onload = () => {
  generateArray();
  updateAlgoInfo();
};


// ===== GENERATE RANDOM ARRAY =====
function generateArray() {
  if (isSorting) return;

  const size = parseInt(arraySizeSlider.value);
  array = [];

  for (let i = 0; i < size; i++) {
    // random height between 10 and 95 (as percentage)
    array.push(Math.floor(Math.random() * 86) + 10);
  }

  renderBars();
  resetStats();
  setStatus('Ready');
}


// ===== RENDER BARS =====
function renderBars(highlights = {}) {
  visualizer.innerHTML = '';

  array.forEach((val, idx) => {
    const bar = document.createElement('div');
    bar.classList.add('bar', 'new-bar');
    bar.style.height = val + '%';

    // Apply color class based on highlight state
    if (highlights[idx] === 'comparing') bar.classList.add('comparing');
    else if (highlights[idx] === 'swapping') bar.classList.add('swapping');
    else if (highlights[idx] === 'sorted') bar.classList.add('sorted');
    else if (highlights[idx] === 'pivot') bar.classList.add('pivot');

    visualizer.appendChild(bar);
  });
}


// ===== STATS HELPERS =====
function resetStats() {
  comparisons = 0;
  swaps = 0;
  compEl.textContent = '0';
  swapsEl.textContent = '0';
}

function updateStats() {
  compEl.textContent = comparisons;
  swapsEl.textContent = swaps;
}

function setStatus(text) {
  statusEl.textContent = text;
}


// ===== SLEEP HELPER =====
// This is what creates the animation effect - pauses execution
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDelay() {
  return speedMap[speedSlider.value];
}


// ===== SWAP HELPER =====
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  swaps++;
}


// ===== MARK ALL SORTED =====
async function markAllSorted() {
  const bars = visualizer.querySelectorAll('.bar');
  for (let i = 0; i < bars.length; i++) {
    bars[i].className = 'bar sorted';
    await sleep(10);
  }
}


// ===== LOCK/UNLOCK UI =====
function lockUI() {
  isSorting = true;
  startBtn.disabled = true;
  generateBtn.disabled = true;
  algoSelect.disabled = true;
  arraySizeSlider.disabled = true;
  stopBtn.disabled = false;
}

function unlockUI() {
  isSorting = false;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  generateBtn.disabled = false;
  algoSelect.disabled = false;
  arraySizeSlider.disabled = false;
}


// ===== UPDATE ALGO INFO CARD =====
function updateAlgoInfo() {
  const algo = algoSelect.value;
  const info = algoInfo[algo];
  algoName.textContent = info.name;
  algoDesc.textContent = info.desc;
  bestEl.textContent   = info.best;
  avgEl.textContent    = info.avg;
  worstEl.textContent  = info.worst;
  spaceEl.textContent  = info.space;
  complexityEl.textContent = info.complexity;
}


// ===== EVENT LISTENERS =====
generateBtn.addEventListener('click', generateArray);

arraySizeSlider.addEventListener('input', () => {
  sizeVal.textContent = arraySizeSlider.value;
  generateArray();
});

speedSlider.addEventListener('input', () => {
  speedVal.textContent = speedLabels[speedSlider.value];
});

algoSelect.addEventListener('change', () => {
  updateAlgoInfo();
  if (!isSorting) generateArray();
});

stopBtn.addEventListener('click', () => {
  stopRequested = true;
  setStatus('Stopped');
});

startBtn.addEventListener('click', async () => {
  if (isSorting) return;

  stopRequested = false;
  lockUI();
  resetStats();
  setStatus('Running...');

  const algo = algoSelect.value;

  if      (algo === 'bubble')    await bubbleSort();
  else if (algo === 'selection') await selectionSort();
  else if (algo === 'insertion') await insertionSort();
  else if (algo === 'merge')     await mergeSort(0, array.length - 1);
  else if (algo === 'quick')     await quickSort(0, array.length - 1);

  if (!stopRequested) {
    await markAllSorted();
    setStatus('Done! ✅');
  }

  unlockUI();
});


// ====================================================
// SORTING ALGORITHMS
// ====================================================


// ----- BUBBLE SORT -----
async function bubbleSort() {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (stopRequested) return;

      comparisons++;
      updateStats();

      // Highlight comparing
      renderBars({ [j]: 'comparing', [j+1]: 'comparing' });
      await sleep(getDelay());

      if (array[j] > array[j + 1]) {
        // Highlight swapping
        renderBars({ [j]: 'swapping', [j+1]: 'swapping' });
        await sleep(getDelay());

        swap(array, j, j + 1);
        updateStats();
      }
    }

    // Mark last i+1 elements as sorted
    const sortedHighlights = {};
    for (let k = n - i - 1; k < n; k++) sortedHighlights[k] = 'sorted';
    renderBars(sortedHighlights);
  }
}


// ----- SELECTION SORT -----
async function selectionSort() {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    if (stopRequested) return;

    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (stopRequested) return;

      comparisons++;
      updateStats();

      renderBars({ [minIdx]: 'pivot', [j]: 'comparing' });
      await sleep(getDelay());

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      renderBars({ [i]: 'swapping', [minIdx]: 'swapping' });
      await sleep(getDelay() * 2);
      swap(array, i, minIdx);
      updateStats();
    }

    // Mark sorted portion
    const sortedHighlights = {};
    for (let k = 0; k <= i; k++) sortedHighlights[k] = 'sorted';
    renderBars(sortedHighlights);
  }
}


// ----- INSERTION SORT -----
async function insertionSort() {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    if (stopRequested) return;

    let key = array[i];
    let j = i - 1;

    renderBars({ [i]: 'comparing' });
    await sleep(getDelay());

    while (j >= 0 && array[j] > key) {
      if (stopRequested) return;

      comparisons++;
      updateStats();

      renderBars({ [j]: 'swapping', [j+1]: 'swapping' });
      await sleep(getDelay());

      array[j + 1] = array[j];
      swaps++;
      updateStats();
      j--;
    }

    array[j + 1] = key;

    // Color sorted part
    const sortedHighlights = {};
    for (let k = 0; k <= i; k++) sortedHighlights[k] = 'sorted';
    renderBars(sortedHighlights);
  }
}


// ----- MERGE SORT -----
// This one's recursive - divide and conquer!
async function mergeSort(left, right) {
  if (left >= right || stopRequested) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);
  await merge(left, mid, right);
}

async function merge(left, mid, right) {
  const leftArr  = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (stopRequested) return;

    comparisons++;
    updateStats();

    renderBars({ [k]: 'comparing' });
    await sleep(getDelay());

    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i];
      i++;
    } else {
      array[k] = rightArr[j];
      j++;
      swaps++;
    }
    updateStats();

    renderBars({ [k]: 'swapping' });
    await sleep(getDelay());
    k++;
  }

  while (i < leftArr.length) {
    if (stopRequested) return;
    array[k] = leftArr[i];
    renderBars({ [k]: 'sorted' });
    await sleep(getDelay());
    i++; k++;
  }

  while (j < rightArr.length) {
    if (stopRequested) return;
    array[k] = rightArr[j];
    renderBars({ [k]: 'sorted' });
    await sleep(getDelay());
    j++; k++;
  }
}


// ----- QUICK SORT -----
// Partition around pivot
async function quickSort(low, high) {
  if (low >= high || stopRequested) return;

  const pivotIdx = await partition(low, high);
  await quickSort(low, pivotIdx - 1);
  await quickSort(pivotIdx + 1, high);
}

async function partition(low, high) {
  const pivot = array[high];
  let i = low - 1;

  renderBars({ [high]: 'pivot' });
  await sleep(getDelay());

  for (let j = low; j < high; j++) {
    if (stopRequested) return low;

    comparisons++;
    updateStats();

    renderBars({ [high]: 'pivot', [j]: 'comparing' });
    await sleep(getDelay());

    if (array[j] <= pivot) {
      i++;
      renderBars({ [high]: 'pivot', [i]: 'swapping', [j]: 'swapping' });
      await sleep(getDelay());
      swap(array, i, j);
      updateStats();
    }
  }

  swap(array, i + 1, high);
  swaps++;
  updateStats();

  renderBars({ [i + 1]: 'sorted' });
  await sleep(getDelay());

  return i + 1;
}
