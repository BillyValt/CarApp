import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';

const removeBtn = document.querySelector('.remove-btn');

const getCars = getFromStorage('carsData');

function removeCar() {

}

console.log(getFromStorage('clickedCarId'));
removeBtn.addEventListener('click', () => {
  const newCarsList = getCars.slice();

  newCarsList.splice(0, 1);
  console.log(newCarsList);

  saveToStorage('carsData', newCarsList);
})