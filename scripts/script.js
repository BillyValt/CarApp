import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';

const carListEl = document.querySelector('.car-list');
const getCars = getFromStorage('carsData');

renderCarList();

function renderCarList() {
  if (getCars.length === 0 || !getCars) {
    carListEl.innerHTML += `
    <div class="no-cars js-no-cars">Нет добавленных автомобилей</div>
    `;
  } else if (getCars.length > 0) {
    getCars.forEach((carInfo, index) => {
      let carNum = index + 1;
      const { carName, carYear, carVin } = carInfo;

      carListEl.innerHTML += `
        <a href="maintLog.html">
          <div class="car-log" data-car-id=${index}>
            <div class="number">${carNum}</div>
            <div class="car-info">
              <div class="car-name">${carName} <span class="car-year">${carYear}</span></div>
              <div class="car-vin">VIN: ${carVin}</div>
            </div>
          </div>
        </a>
      `;

    });
  }
}

const carLogEl = document.querySelectorAll('.car-log');

carLogEl.forEach((logEl, index) => {
  const logLink = logEl.dataset.carId;
  console.log(logEl.dataset, index)

  logEl.addEventListener('click', () => {
    removeFromStorage('clickedCarId');
    saveToStorage('clickedCarId', logLink);
    console.log(logLink);
  });
})

