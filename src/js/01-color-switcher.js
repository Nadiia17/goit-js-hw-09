const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
const PROMPT_DELAY = 1000;
let timerId = null;
stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', onStartClickHandler);
function onStartClickHandler() {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, PROMPT_DELAY);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtnEl.addEventListener('click', onStopClickHandler);
function onStopClickHandler() {
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
  clearInterval(timerId);
}
