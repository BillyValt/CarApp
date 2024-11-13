import { saveToStorage, getFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const dropDownEl = document.querySelector('.dropdown-block');
const choseNameEl = document.querySelector('.js-choose-job');
const dropDownListEl = document.querySelector('.dropdown-list--close');
const chevronIconEl = document.querySelector('.chevron-icon');
const jobTypeEl = document.querySelectorAll('.dropdown-list--close .js-job-type');
const dateTimeEl = document.querySelector('.date-time');
const carNameEl = document.querySelector('.car-info-container');
const inputDateEl = document.querySelector('.js-input-job-date');
const inputMileageEl = document.querySelector('.js-input-mileage');

const date = dayjs().format('D.MM.YY');
const time = dayjs().format('HH:mm');
const updTimeId = setInterval(updateTime, 15500);

const clickedCarId = getFromStorage('clickedCarId');
const getCars = getFromStorage('carsData');
const currentCar = getCars[clickedCarId];

let chosenJob;
let jobData;

dropDownEl.addEventListener('click', () => {
  dropDownListEl.classList.toggle('dropdown-list--open');
  dropDownEl.classList.toggle('dropdown-block--open');
  chevronIconEl.classList.toggle('chevron-icon--open');
})

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

  dateTimeEl.innerHTML = `
  ${date} ${time}
  `;
}

jobTypeEl.forEach(jobType => {
  jobType.addEventListener('click', () => {
    chosenJob = jobType.innerText;
    choseNameEl.innerText = `${chosenJob}`;
    saveToStorage('jobType',)
    console.log(chosenJob)
  })
})

carNameEl.innerHTML = `
  <div class="car-icon">
    <img width="106px" height="53px" src="icons/car-icon.svg" alt="car">
  </div>

  <div class="car-name">${currentCar.carName}<span class="car-year"> ${currentCar.carYear}</span></div>
  <div class="car-vin"><span class="car-vin--title">VIN: </span>${currentCar.carVin}</div>
`;

