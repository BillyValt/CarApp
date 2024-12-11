import { saveToStorage, getFromStorage } from './utils/saveToStorage.js';
import { updateTime } from './utils/navDate.js';
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
const addBtnEl = document.querySelector('.js-add-car-btn');
const errorMesnEl = document.querySelector('.js-error-message');
const jobAddedNotif = document.querySelector('.car-added-notif');

const clickedCarId = getFromStorage('clickedCarId');
let getCars = getFromStorage('carsData');
const currentCar = getCars[clickedCarId];

let jobId;
let chosenJob;
let jobDate;
let jobMileage;
let nextMaintDate;
let nextMaintMileage;

let iconName;
let carMaintData = {};

carNameEl.innerHTML = `
  <div class="car-icon">
    <img width="106px" height="53px" src="icons/car-icon.svg" alt="car">
  </div>

  <div class="car-name">${currentCar.carName}<span class="car-year"> ${currentCar.carYear}</span></div>
  <div class="car-vin"><span class="car-vin--title">VIN: </span>${currentCar.carVin}</div>
`;
updateTime();

dropDownEl.addEventListener('click', () => {
  dropDownListEl.classList.toggle('dropdown-list--open');
  dropDownEl.classList.toggle('dropdown-block--open');
  chevronIconEl.classList.toggle('chevron-icon--open');
})

jobTypeEl.forEach((jobType, index) => {
  jobType.addEventListener('click', () => {
    jobId = index;

    switch (index) {
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


    chosenJob = jobType.innerText;
    choseNameEl.innerHTML = `
    <img src="icons/job-icons/${iconName}.svg" alt="${iconName}" width="20" height="20">
    ${chosenJob}`;
    // saveToStorage('jobType',)

  })
})

addBtnEl.addEventListener('click', () => {
  // jobDate = inputDateEl.value;
  jobMileage = inputMileageEl.value;
  nextMaintDate = addDaysToDate(365);
  console.log('NextMaintDate', nextMaintDate);
  console.log('NextMaintMileage', typeof jobMileage);

  switch (jobId) {
    case 0: nextMaintDate = addDaysToDate(365);
      nextMaintMileage = Number(jobMileage) + 10000;
      break;
    case 1: nextMaintDate = '';
      nextMaintMileage = Number(jobMileage) + 50000;
      break;
    case 2: nextMaintDate = '';
      nextMaintMileage = `Проверьте на ${Number(jobMileage) + 100000}`;
      break;
    case 3: nextMaintDate = addDaysToDate(365);
      nextMaintMileage = Number(jobMileage) + 15000;
      break;
    case 4: nextMaintDate = '';
      nextMaintMileage = Number(jobMileage) + 30000;;
      break;
    case 5: nextMaintDate = '';
      nextMaintMileage = Number(jobMileage) + 30000;;
      break;
    case 6: nextMaintDate = '';
      nextMaintMileage = Number(jobMileage) + 40000;;
      break;
    case 7: nextMaintDate = '';
      nextMaintMileage = `Проверьте на ${Number(jobMileage) + 20000}`
      break;
  }

  carMaintData = {
    jobId,
    chosenJob,
    jobDate,
    jobMileage,
    nextMaintDate,
    nextMaintMileage
  }
  console.log(jobId)



  // console.log(carMaintData.jobId);
  // console.log(carMaintData.jobDate);
  // console.log(carMaintData.chosenJob);
  // console.log(carMaintData.nextMaintDate);
  // console.log(carMaintData.jobMileage);



  if (!chosenJob || !jobDate || !jobMileage) {
    errorMesnEl.style.display = 'flex';
  } else {
    errorMesnEl.style.display = 'none';
    getCars[clickedCarId].carMaintData.push(carMaintData);
    saveToStorage('carsData', getCars);
    jobAddedNotif.classList.add('car-added-notif--open');

    addBtnEl.disabled = true;

    // setTimeout(() => (
    //   jobAddedNotif.classList.remove('car-added-notif--open'), window.open('maintLog.html', '_self')
    // ), 1200);


    setTimeout(() => (
      jobAddedNotif.classList.remove('car-added-notif--open')
    ), 1200);
  }
})

const monthsShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'нояб', 'дек'];

const inputDate = inputDateEl.value;
const dateObj = Date(inputDate);

inputDateEl.addEventListener('change', event => {
  const date = new Date(event.target.value);
  if (!isNaN(date)) {
    const day = date.getDate();
    const month = monthsShort[date.getMonth()];
    const year = date.getFullYear();

    jobDate = `${day}${month} ${year}`;
  }
})

function addDaysToDate(daysToAdd) {
  const input = document.querySelector('.js-input-job-date');

  const inputValue = input.value;

  if (!inputValue) {
    console.log('Errrrrror1');
    return;
  }

  const currentDate = new Date(inputValue);

  if (isNaN(currentDate.getTime())) {
    console.log('Errrrrror2');
    return;
  }

  currentDate.setDate(currentDate.getDate() + daysToAdd);

  const formattedDate = currentDate.toISOString().split("T")[0];

  const month = formattedDate.split('-')[1];
  const year = formattedDate.split('-')[0];
  const day = formattedDate.split('-')[2];

  const monthIndex = parseInt(month, 10) - 1;
  const formattedMonth = monthsShort[monthIndex];


  return `${day}${formattedMonth} ${year}`;
}

