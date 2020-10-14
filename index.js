let runningTotal = 0;
let buffer = '0';
let previousOperator;
const screen = document.querySelector('.screen');

const displayResult = () => {
  screen.innerText = buffer;
};

const handleOperator = (value) => {
  switch (value) {
    case 'C':
      runningTotal = 0;
      buffer = '0';
      break;

    case 'back':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case '+':
      handleMath(value);
      break;

    case '-':
      handleMath(value);
      break;

    case '*':
      handleMath(value);
      break;

    case '/':
      handleMath(value);
      break;

    case '=':
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
  }
};

const handleNumber = (value) => {
  if (buffer === '0') {
    buffer = value;
  } else {
    buffer += value;
  }
};

const handleMath = (value) => {
  if (buffer === '0') {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = '0';
};

const flushOperation = (intBuffer) => {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '/') {
    runningTotal /= intBuffer;
  } else if (previousOperator === '*') {
    runningTotal *= intBuffer;
  }
};

const handleClick = (event) => {
  if (isNaN(event.target.innerText)) {
    handleOperator(event.target.value);
  } else {
    handleNumber(event.target.innerText);
  }

  displayResult();
};

const init = () => {
  document.querySelector('.calc-btns').addEventListener('click', handleClick);
  displayResult(buffer);
  console.log(buffer);
};

init();
