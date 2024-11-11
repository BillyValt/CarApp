import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const removeBtn = document.querySelector('.remove-btn');
const dateTimeEl = document.querySelector('.date-time');
const carNameEl = document.querySelector('.car-info-container');

const clickedCarId = getFromStorage('clickedCarId');
const getCars = getFromStorage('carsData');
const currentCar = getCars[clickedCarId];
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
}
setInterval(updateTime, 15500);
updateTime();

carNameEl.innerHTML = `
  <div class="car-icon">
    <img width="106px" height="53px" src="icons/car-icon.svg" alt="car">
  </div>

  <div class="car-name">${currentCar.carName}<span class="car-year"> ${currentCar.carYear}</span></div>
  <div class="car-vin"><span class="car-vin--title">VIN: </span>${currentCar.carVin}</div>
`;

console.log(currentCar);