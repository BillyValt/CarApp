import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateTime } from './utils/navDate.js';


const removeBtn = document.querySelector('.remove-btn');
const dateTimeEl = document.querySelector('.date-time');
const carNameEl = document.querySelector('.car-info-container');
const logsContEl = document.querySelector('.logs-container');
const carRemovedEl = document.querySelector('.car-removed-notif');
const dialogueEl = document.querySelector('.car-remove-dialogue');
const dialCarNameEl = document.querySelector('.js-dialogue-carname');
const iconBackgEl = document.querySelector('.job-icon-container');
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
      let iconBackrColor;

      switch (jobId) {
        case 0: iconName = 'oil'; iconBackrColor = '#4FC3F7';
          break;
        case 1: iconName = 'belt'; iconBackrColor = '#A4C639';
          break;
        case 2: iconName = 'chain'; iconBackrColor = '#FFEB3B';
          break;
        case 3: iconName = 'filter1'; iconBackrColor = '#FF7043';
          break;
        case 4: iconName = 'filter'; iconBackrColor = '#FFA726';
          break;
        case 5: iconName = 'sparkplug'; iconBackrColor = '#26C6DA';
          break;
        case 6: iconName = 'fuel'; iconBackrColor = '#BA68C8';
          break;
        case 7: iconName = 'belt1'; iconBackrColor = '#FFAB91';
          break;
      }
      console.log(iconName);
      console.log(iconBackrColor);

      if (currentCar.carMaintData.length > 0) {
        logsContEl.innerHTML += `
        <div class="log">
          <div class="log-name">
          <div class="job-icon-container job-icon-container--col${jobId}">
               <img class="job-icon" src="icons/job-icons/${iconName}.svg" alt="${iconName}">
          </div>
       
            ${chosenJob}
          </div>
          <div class="log-date"><img src="icons/card-icons/calendar.svg"> ${jobDate}</div>
          <div class="log-mileage"><img src="icons/card-icons/speedometer.svg"> ${jobMileage}км</div>
          <div class="log-next"><img src="icons/card-icons/repeat.svg">14нояб 2025| 277463км</div>
        </div>
      `;
      }
    })

  }
}

clearLogBtn.addEventListener('click', () => {
  currentCar.carMaintData.splice(0, currentCar.carMaintData.length);

  saveToStorage('carsData', getCars);
})



