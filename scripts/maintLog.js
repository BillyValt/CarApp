import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateTime } from './utils/navDate.js';


const removeBtn = document.querySelector('.remove-btn');
const carNameEl = document.querySelector('.car-info-container');
const logsContEl = document.querySelector('.logs-container');
const carRemovedEl = document.querySelector('.car-removed-notif');
const dialogueEl = document.querySelector('.car-remove-dialogue');
const dialCarNameEl = document.querySelector('.js-dialogue-carname');
const dialYesBtn = document.querySelector('.js-yes-btn');
const dialNoBtn = document.querySelector('.js-no-btn');
const dialogueCardEl = document.querySelector('.card-remove-dialogue');
const dialCardYesBtn = document.querySelector('.js-yes-btn--card');
const dialCardNoBtn = document.querySelector('.js-no-btn--card');
const dialogueCardNameEl = document.querySelector('.js-dialogue-cardname');
const dialogueBlackBackgroundEl = document.querySelector('.card-remove-background');


const clickedCarId = getFromStorage('clickedCarId');
let getCars = getFromStorage('carsData');
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

carNameEl.innerHTML = `
  <div class="car-icon">
    <img width="106px" height="53px" src="icons/car-icon.svg" alt="car">
  </div>

  <div class="car-name">${currentCar.carName}<span class="car-year"> ${currentCar.carYear}</span></div>
  <div class="car-vin"><span class="car-vin--title">VIN: </span>${currentCar.carVin}</div>
`;

let carMaintArr = currentCar.carMaintData;
let removeJobName;
renderLogsList();
function renderLogsList() {
  logsContEl.innerHTML = '';

  if (!currentCar.carMaintData || currentCar.carMaintData.length === 0) {
    logsContEl.innerHTML += `
      <div class="no-cars js-no-cars">Нет записей</div>
      `;
  } else if (getCars.length > 0) {
    currentCar.carMaintData.forEach((log, index) => {
      const jobId = log.jobId;
      const chosenJob = log.chosenJob;
      const jobDate = log.jobDate;
      const jobMileage = log.jobMileage;
      const nextMaintDate = log.nextMaintDate;
      const nextMaintMileage = log.nextMaintMileage;
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
          <div class="log-next"><img src="icons/card-icons/repeat.svg">${nextMaintDate ? nextMaintDate : ''} ${!nextMaintDate || !nextMaintMileage ? '' : '|'} ${nextMaintMileage ? nextMaintMileage + 'км' : ''}</div>
          <img class="trash-img" src="icons/card-icons/trash.svg" alt="trash">
        </div>
      `;
      }
    })
  }

  const trashIcn = document.querySelectorAll('.trash-img');
  trashIcn.forEach((button, btnIndex) => {
    button.addEventListener('click', () => {
      dialogueCardEl.classList.add('card-remove-dialogue--open');
      dialogueBlackBackgroundEl.classList.add('card-remove-background--open');
      // document.body.style.filter = 'blur(4px)';
      document.body.classList.add('stop-scrolling');


      clickedRemBtnIndex = btnIndex;
      removeJobName = carMaintArr[btnIndex].chosenJob;
      dialogueCardNameEl.innerText = `${removeJobName}`;
    })
  })
}

let clickedRemBtnIndex;

function removeCard(buttonIndex) {
  carMaintArr.splice(buttonIndex, 1);
  saveToStorage('carsData', getCars);
}

dialCardYesBtn.addEventListener('click', () => {
  dialogueCardEl.classList.remove('card-remove-dialogue--open');
  dialogueBlackBackgroundEl.classList.remove('card-remove-background--open');
  console.log('called');
  document.body.classList.remove('stop-scrolling');

  carMaintArr.forEach((card, cardIndex) => {
    if (clickedRemBtnIndex === cardIndex) {
      removeCard(clickedRemBtnIndex);
      console.log('click', cardIndex);
      renderLogsList();
    }
  });
})

dialCardNoBtn.addEventListener('click', () => {
  dialogueCardEl.classList.remove('card-remove-dialogue--open');
  dialogueBlackBackgroundEl.classList.remove('card-remove-background--open');
  document.body.classList.remove('stop-scrolling');
})