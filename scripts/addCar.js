import { saveToStorage, getFromStorage } from "./utils/saveToStorage.js";
// import { carsData } from "/scripts/carsData.js";

const carBrandInputEl = document.querySelector('.js-addcar-input');
const yearInputEl = document.querySelector('.js-year-input');
yearInputEl.value = 2000;
const vinInputEl = document.querySelector('.js-vin-input');
const addCarBtEl = document.querySelector('.js-add-car-bt');

let carsData = getFromStorage('carsData') || [];
// saveToStorage('carsData', carsData);

addCarBtEl.addEventListener('click', () => {
  const carName = carBrandInputEl.value;
  const carYear = yearInputEl.value;
  const carVin = vinInputEl.value;

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

  console.log(carName);
  console.log(carYear);
  console.log(carVin);

  console.log(carsData);
  console.log(carName);
})

