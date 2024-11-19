import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const removeBtn = document.querySelector('.remove-btn');
const dateTimeEl = document.querySelector('.date-time');
const carNameEl = document.querySelector('.car-info-container');
const logsContEl = document.querySelector('.logs-container');
const carRemovedEl = document.querySelector('.car-removed-notif');
const dialogueEl = document.querySelector('.car-remove-dialogue');
const dialCarNameEl = document.querySelector('.js-dialogue-carname');
const dialYesBtn = document.querySelector('.js-yes-btn');
const dialNoBtn = document.querySelector('.js-no-btn');
//FOR SERVICE ONLY
const clearLogBtn = document.querySelector('.js-clear-log');


const clickedCarId = getFromStorage('clickedCarId');
const getCars = getFromStorage('carsData');
const currentCar = getCars[clickedCarId];
const currentCarName = currentCar.carName;
const currentCarYear = currentCar.carYear;

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
  dialogueEl.classList.add('car-remove-dialogue--open');
  dialCarNameEl.innerHTML = `${currentCarName} ${currentCarYear}`;

  dialYesBtn.addEventListener('click', () => {
    const newCarsList = getCars.slice();
    newCarsList.splice(clickedCarId, 1);
    saveToStorage('carsData', newCarsList);
    dialogueEl.classList.remove('car-remove-dialogue--open');
    carRemovedEl.classList.add('car-removed-notif--open');

    setTimeout(() => { window.open('index.html', '_self') }, 1200);
  })
  dialNoBtn.addEventListener('click', () => {
    dialogueEl.classList.remove('car-remove-dialogue--open');
  })
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
  if (!currentCar.carMaintData || currentCar.carMaintData.length === 0) {
    logsContEl.innerHTML += `
      <div class="no-cars js-no-cars">Нет записей</div>
      `;
  } else if (getCars.length > 0) {
    currentCar.carMaintData.forEach((log, index) => {
      const chosenJob = log.chosenJob;
      const jobDate = log.jobDate;
      const jobMileage = log.jobMileage;
      const jobId = log.jobId;
      let iconName;

      switch (jobId) {
        case 0: iconName = 'oil';
          break;
        case 1: iconName = 'belt';
          break;
        case 2: iconName = 'chain';
          break;
        case 3: iconName = 'filter1';
          break;
        case 4: iconName = 'filter';
          break;
        case 5: iconName = 'sparkplug';
          break;
        case 6: iconName = 'fuel';
          break;
        case 7: iconName = 'belt1';
          break;
      }
      console.log(iconName);

      if (currentCar.carMaintData.length > 0) {
        logsContEl.innerHTML += `
        <div class="log">
          <div class="log-name">
            <img class="job-icon" src="icons/job-icons/${iconName}.svg" alt="${iconName}">
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

