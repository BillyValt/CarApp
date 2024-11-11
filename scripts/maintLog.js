import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const removeBtn = document.querySelector('.remove-btn');
const dateTimeEl = document.querySelector('.date-time');

const clickedCarId = getFromStorage('clickedCarId');
const getCars = getFromStorage('carsData');
const date = dayjs().format('D.MM.YY');
const time = dayjs().format('HH:mm');

// function removeCar() {
// }

removeBtn.addEventListener('click', () => {
  const newCarsList = getCars.slice();

  newCarsList.splice(clickedCarId, 1);

  console.log(newCarsList);

  saveToStorage('carsData', newCarsList);
})


console.log(clickedCarId);
console.log(date);
console.log(dateTimeEl);

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  dateTimeEl.innerHTML = `
  ${date} ${time}
`;

  console.log(time); // or update the time in your HTML, e.g., document.getElementById("time").innerText = time;
}

// Update every minute
setInterval(updateTime, 15500);

// Call once immediately to display the initial time
updateTime();