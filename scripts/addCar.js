import { saveToStorage, getFromStorage } from "./utils/saveToStorage.js";
// import { carsData } from "/scripts/carsData.js";

const carBrandInputEl = document.querySelector('.js-addcar-input');
const yearInputEl = document.querySelector('.js-year-input');
// yearInputEl.value = 2000; 
const vinInputEl = document.querySelector('.js-vin-input');
const addCarBtEl = document.querySelector('.js-add-car-bt');
const errorMesEl = document.querySelector('.error-message-car');
const carAddedEl = document.querySelector('.car-added-notif');


const getCars = getFromStorage('carsData');
let addedCarId = getCars.length;

let carsData = getFromStorage('carsData') || [];
// saveToStorage('carsData', carsData);

addCarBtEl.addEventListener('click', () => {
  const carName = carBrandInputEl.value;
  const carYear = yearInputEl.value;
  const carVin = vinInputEl.value;

  if (!carName) {
    errorMesEl.classList.add('error-message-car--open');
  } else {
    errorMesEl.classList.remove('error-message-car--open');

    let carData = {
      carMaintData: [],
      carName,
      carYear,
      carVin
    }

    carsData.push(carData);

    saveToStorage('carsData', carsData);

    carBrandInputEl.value = '';
    yearInputEl.value = '';
    vinInputEl.value = '';

    carAddedEl.classList.add('car-added-notif--open');
    setTimeout(() => (
      carAddedEl.classList.remove('car-added-notif--open'), window.open('maintLog.html', '_self')
    ), 1200);
    saveToStorage('clickedCarId', addedCarId);
  }
})

