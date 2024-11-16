import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const removeBtn = document.querySelector('.remove-btn');
const dateTimeEl = document.querySelector('.date-time');
const carNameEl = document.querySelector('.car-info-container');
const logsContEl = document.querySelector('.logs-container');
//FOR SERVICE ONLY
const clearLogBtn = document.querySelector('.js-clear-log');


const clickedCarId = getFromStorage('clickedCarId');
const getCars = getFromStorage('carsData');
const currentCar = getCars[clickedCarId];

const date = dayjs().format('D.MM.YY');
const time = dayjs().format('HH:mm');
let updTimeId;

updateTime();
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  // const maintHistory = [{
  //   type: 'oil',
  //   date: '14.10.24',
  //   mileage: '267463',
  //   nextMaintDate: '14.10.24',
  //   nextMaintMileage: '277463'
  // }, {
  //   type: 'belt',
  //   date: '14.10.24',
  //   mileage: '267463',
  //   nextMaintMileage: '277463'
  // }
  // ]

  clearInterval(updTimeId);
  updTimeId = setInterval(updateTime, 15500);

  dateTimeEl.innerHTML = `
  ${date} ${time}
  `;
}

removeBtn.addEventListener('click', () => {
  const newCarsList = getCars.slice();

  newCarsList.splice(clickedCarId, 1);

  console.log(newCarsList);

  saveToStorage('carsData', newCarsList);
})

console.log(clickedCarId);
console.log(currentCar);

carNameEl.innerHTML = `
  <div class="car-icon">
    <img width="106px" height="53px" src="icons/car-icon.svg" alt="car">
  </div>

  <div class="car-name">${currentCar.carName}<span class="car-year"> ${currentCar.carYear}</span></div>
  <div class="car-vin"><span class="car-vin--title">VIN: </span>${currentCar.carVin}</div>
`;

renderLogsList();
function renderLogsList() {
  if (currentCar.carMaintData.length === 0) {
    logsContEl.innerHTML += `
      <div class="no-cars js-no-cars">Нет записей</div>
      `;
  } else if (getCars.length > 0) {
    currentCar.carMaintData.forEach(log => {
      const chosenJob = log.chosenJob;
      const jobDate = log.jobDate;
      const jobMileage = log.jobMileage;
      let iconName;

      switch (chosenJob) {
        case 'Замена масла двигателя': iconName = 'oil';
        break;
        case 'Замена ремня ГРМ': iconName = 'belt';
        break;
        case 'Замена цепи ГРМ': iconName = 'chain';
        break;
        case 'Замена фильтра салона': iconName = 'filter1';
        break;
        case 'Замена фильтра двигат.': iconName = 'filter';
        break;
        case 'Замена свечей': iconName = 'sparkplug';
        break;
      }

      // if (chosenJob === 'Замена масла двигателя') {
      //   iconName = 'oil';
      // } else if (chosenJob === 'Замена ремня ГРМ') {
      //   iconName = 'chain';
      // } else if (chosenJob === 'Замена ремня ГРМ') {
      //   iconName = 'chain';
      // }

      console.log(chosenJob);
      console.log(jobDate);
      console.log(jobMileage);

      if (currentCar.carMaintData.length > 0) {
        logsContEl.innerHTML += `
      <div class="log">
        <div class="log-name log-name--yellow">
          <img class="job-icon" src="./icons/job icons/${iconName}.svg" alt="${iconName}" width="23" height="23">
          ${chosenJob}
        </div>
      <div class="log-date">Дата: ${jobDate}</div>
      <div class="log-mileage">Пробег: ${jobMileage}км</div>
      <div class="log-next">Замените: 14.10.2025/ 277463км</div>
      </div>
      `}
    })
  }
}

clearLogBtn.addEventListener('click', () => {
  currentCar.carMaintData.splice(0, currentCar.carMaintData.length);

  saveToStorage('carsData', getCars);
})