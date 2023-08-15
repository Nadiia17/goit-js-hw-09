import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const daysLeftEl = document.querySelector('[data-days]');
const hoursLeftEl = document.querySelector('[data-hours]');
const minutesLeftEl = document.querySelector('[data-minutes]');
const secondsLeftEl = document.querySelector('[data-seconds]');
startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDateTime = selectedDates[0];
    const currentDateTime = new Date();
    if (chosenDateTime < currentDateTime) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
startBtnEl.addEventListener('click', onClickHandler);

let intervalId;

function onClickHandler() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  startBtnEl.disabled = true;
  const currentTimeUnix = Date.now();
  const chosenTimeUnix = new Date(inputEl.value).getTime();
  const timeDifference = chosenTimeUnix - currentTimeUnix;
  let remainingTime = chosenTimeUnix - currentTimeUnix;

  intervalId = setInterval(() => {
    remainingTime -= 1000;

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      remainingTime = 0;
    }

    const timeLeft = convertMs(remainingTime);
    daysLeftEl.textContent = addLeadingZero(timeLeft.days);
    hoursLeftEl.textContent = addLeadingZero(timeLeft.hours);
    minutesLeftEl.textContent = addLeadingZero(timeLeft.minutes);
    secondsLeftEl.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
