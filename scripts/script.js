import { saveToStorage, getFromStorage } from './utils/saveToStorage.js';

const getCars = getFromStorage('carsData');
const carListEl = document.querySelector('.car-list');


renderCarList();

function renderCarList() {
  if (getCars) {
    getCars.forEach((carInfo, index) => {
      let carNum = index + 1;
      const { carName, carYear, carVin } = carInfo;

      carListEl.innerHTML += `
        <a href="maintLog.html">
          <div class="car-log">
            <div class="number">${carNum}</div>
            <div class="car-info">
              <div class="car-name">${carName} <span class="car-year">${carYear}</span></div>
              <div class="car-vin">VIN: ${carVin}</div>
            </div>
          </div>
        </a>
      `;

    });
  } else {
    carListEl.innerHTML += `
    <div class="no-cars js-no-cars">Нет добавленных автомобилей</div>
    `;
  }
}
